package shop;

import java.util.ArrayList;
import java.util.List;
import shop.decorator.GiftWrapDecorator;
import shop.decorator.WarrantyDecorator;
import shop.facade.CheckoutFacade;
import shop.factory.DigitalProductCreator;
import shop.factory.GiftCardProductCreator;
import shop.factory.PhysicalProductCreator;
import shop.factory.ProductCreator;
import shop.model.Customer;
import shop.model.Product;
import shop.order.DeliveryType;
import shop.order.Order;
import shop.order.OrderStatus;
import shop.strategy.StudentDiscount;

public class Demo {
    public static void main(String[] args) {
        ProductCreator creator = new PhysicalProductCreator();
        Product laptop = creator.createProduct("ASUS TUF Gaming Laptop", 520000);

        creator = new DigitalProductCreator();
        Product ebook = creator.createProduct("Java Programming E-Book", 7000);

        creator = new GiftCardProductCreator();
        Product giftCard = creator.createProduct("Gift Card", 20000);

        laptop = new GiftWrapDecorator(laptop);
        laptop = new WarrantyDecorator(laptop);

        List<Product> products = new ArrayList<>();
        products.add(laptop);
        products.add(ebook);
        products.add(giftCard);

        System.out.println("Products:");
        for (Product product : products) {
            System.out.println(product.getName() + " - " + product.getPrice() + " KZT");
        }

        Customer customer = new Customer("Client1", "client1@gmail.com");

        CheckoutFacade checkoutFacade = new CheckoutFacade();
        Order order = checkoutFacade.placeOrder(
                customer,
                products,
                "Astana",
                DeliveryType.STANDARD,
                new StudentDiscount()
        );

        System.out.println("\nOrder shipped");
        order.setStatus(OrderStatus.SHIPPED);

        System.out.println("\nOrder delivered");
        order.setStatus(OrderStatus.DELIVERED);

        System.out.println("\nOrder details:");
        System.out.println("Customer: " + order.getCustomer().getName());
        System.out.println("Address: " + order.getAddress());
        System.out.println("Subtotal: " + order.getSubtotal() + " KZT");
        System.out.println("Discount: " + order.getDiscount() + " KZT");
        System.out.println("Shipping: " + order.getShippingCost() + " KZT");
        System.out.println("Total: " + order.getFinalTotal() + " KZT");
        System.out.println("Status: " + order.getStatus());
    }
}