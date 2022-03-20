package org.generation.WTFuccelent.controller.dto;

public class ItemDTO {

    private String name;
    private String imageUrl;
    private String style;
    private double price;

    public ItemDTO( String name, String imageUrl, String style, double price )
    {
        this.name = name;
        this.imageUrl = imageUrl;
        this.style = style;
        this.price = price;
    }

    public String getName() {
        return name;
    }

    public void setName( String name ) {
        this.name = name;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl( String imageUrl ) {
        this.imageUrl = imageUrl;
    }

    public void setStyle(String style) {
        this.style = style; }

    public String getStyle() {
        return style;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public double getPrice() {
        return price;
    }


}
