package shop.visitor;

import java.util.List;
import shop.model.DigitalProduct;
import shop.model.GiftCardProduct;
import shop.model.PhysicalProduct;
import shop.model.Product;

public class ProductTypeCountVisitor implements ProductVisitor {
    private int physicalCount;
    private int digitalCount;
    private int giftCardCount;

    public void calculate(List<Product> products) {
        physicalCount = 0;
        digitalCount = 0;
        giftCardCount = 0;

        for (Product product : products) {
            product.accept(this);
        }
    }

    @Override
    public void visit(PhysicalProduct product) {
        physicalCount++;
    }

    @Override
    public void visit(DigitalProduct product) {
        digitalCount++;
    }

    @Override
    public void visit(GiftCardProduct product) {
        giftCardCount++;
    }

    public int getPhysicalCount() {
        return physicalCount;
    }

    public int getDigitalCount() {
        return digitalCount;
    }

    public int getGiftCardCount() {
        return giftCardCount;
    }
}