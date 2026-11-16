package shop.visitor;

import java.util.List;
import shop.model.DigitalProduct;
import shop.model.GiftCardProduct;
import shop.model.PhysicalProduct;
import shop.model.Product;
import shop.order.DeliveryType;

public class ShippingVisitor implements ProductVisitor {
    private double totalShipping;
    private DeliveryType deliveryType;

    public double calculate(List<Product> products, DeliveryType deliveryType) {
        if (deliveryType == null) {
            throw new IllegalArgumentException("Delivery type is required.");
        }

        totalShipping = 0;
        this.deliveryType = deliveryType;

        for (Product product : products) {
            product.accept(this);
        }

        return totalShipping;
    }

    @Override
    public void visit(PhysicalProduct product) {
        if (deliveryType == DeliveryType.STANDARD) {
            totalShipping += 2000;
            System.out.println(product.getName() + ": standard delivery - 2000 KZT");
        } else {
            totalShipping += 3500;
            System.out.println(product.getName() + ": express delivery - 3500 KZT");
        }
    }

    @Override
    public void visit(DigitalProduct product) {
        System.out.println(product.getName() + ": no physical delivery required");
    }

    @Override
    public void visit(GiftCardProduct product) {
        if (deliveryType == DeliveryType.STANDARD) {
            totalShipping += 500;
            System.out.println(product.getName() + ": standard envelope delivery - 500 KZT");
        } else {
            totalShipping += 1000;
            System.out.println(product.getName() + ": express envelope delivery - 1000 KZT");
        }
    }
}