package shop.visitor;

import java.util.Random;
import shop.model.DigitalProduct;
import shop.model.GiftCardProduct;
import shop.model.PhysicalProduct;

public class ProductCodeVisitor implements ProductVisitor {
    private final Random random = new Random();
    private String code;

    public String generateCode(shop.model.Product product) {
        product.accept(this);
        return code;
    }

    @Override
    public void visit(PhysicalProduct product) {
        code = String.valueOf(10000000 + random.nextInt(90000000));
    }

    @Override
    public void visit(DigitalProduct product) {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        StringBuilder result = new StringBuilder();

        for (int i = 0; i < 8; i++) {
            int index = random.nextInt(characters.length());
            result.append(characters.charAt(index));
        }

        code = result.toString();
    }

    @Override
    public void visit(GiftCardProduct product) {
        code = "GIFT-" + (10000 + random.nextInt(90000));
    }
}
