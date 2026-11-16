package shop.facade;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import shop.adapter.LegacyBankAPI;
import shop.adapter.LegacyBankAdapter;
import shop.adapter.PaymentGateway;
import shop.model.Customer;
import shop.model.Product;
import shop.observer.CustomerNotifier;
import shop.observer.WarehouseNotifier;
import shop.order.DeliveryType;
import shop.order.Order;
import shop.order.OrderBuilder;
import shop.order.OrderStatus;
import shop.strategy.DiscountCalculator;
import shop.strategy.DiscountStrategy;
import shop.visitor.ProductCodeVisitor;
import shop.visitor.ShippingVisitor;

public class CheckoutFacade {
    private int orderNumber = 1001;

    public Order placeOrder(Customer customer, List<Product> products, String address,
                            DeliveryType deliveryType, DiscountStrategy discountStrategy) {
        ShippingVisitor shippingVisitor = new ShippingVisitor();
        double shippingCost = shippingVisitor.calculate(products, deliveryType);
        BigDecimal subtotal = BigDecimal.ZERO;
        for (Product product : products) {
            subtotal = subtotal.add(BigDecimal.valueOf(product.getPrice()));
        }
        subtotal = subtotal.setScale(2, RoundingMode.HALF_UP);

        DiscountCalculator discountCalculator = new DiscountCalculator(discountStrategy);
        BigDecimal discountedTotal = discountCalculator.calculate(subtotal);
        BigDecimal discountAmount = subtotal.subtract(discountedTotal);

        OrderBuilder builder = new OrderBuilder()
                .setCustomer(customer)
                .setAddress(address)
                .setDeliveryType(deliveryType)
                .setShippingCost(shippingCost)
                .setDiscount(discountAmount.doubleValue());

        for (Product product : products) {
            builder.addProduct(product);
        }

        Order order = builder.build();

        order.addObserver(new CustomerNotifier());
        order.addObserver(new WarehouseNotifier());

        String orderId = "ORD-" + orderNumber++;
        PaymentGateway paymentGateway = new LegacyBankAdapter(new LegacyBankAPI());
        BigDecimal paymentAmount = BigDecimal.valueOf(order.getFinalTotal())
                .setScale(2, RoundingMode.HALF_UP);

        boolean paid = paymentGateway.pay(orderId, paymentAmount);
        if (!paid) {
            throw new IllegalStateException("Payment failed.");
        }

        order.setStatus(OrderStatus.PAID);

        ProductCodeVisitor codeVisitor = new ProductCodeVisitor();
        System.out.println("\nProduct codes:");
        for (Product product : products) {
            System.out.println(product.getName() + ": " + codeVisitor.generateCode(product));
        }

        System.out.println("\nOrder ID: " + orderId);
        System.out.println("Total: " + order.getFinalTotal() + " KZT");
        return order;
    }
}