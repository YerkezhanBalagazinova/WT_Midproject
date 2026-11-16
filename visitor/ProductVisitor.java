package shop.visitor;

import shop.model.DigitalProduct;
import shop.model.GiftCardProduct;
import shop.model.PhysicalProduct;

public interface ProductVisitor {
    void visit(PhysicalProduct product);
    void visit(DigitalProduct product);
    void visit(GiftCardProduct product);
}