package org.generation.WTFuccelent.controller;

import org.generation.WTFuccelent.component.FileUploadUtil;
import org.generation.WTFuccelent.controller.dto.ItemDTO;
import org.generation.WTFuccelent.repository.entity.*;
import org.generation.WTFuccelent.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/item")
public class ItemController {


    @Value("${image.folder}")
    private String imageFolder;

    final ItemService itemService;

    public ItemController( @Autowired ItemService itemService )
    {
        this.itemService = itemService;
    }

    @CrossOrigin
    @GetMapping( "/all" )
    public Iterable<Item> getItems()
    {
        return itemService.all();
    }

    @CrossOrigin
    @GetMapping( "/{id}" )
    public Item findItemById( @PathVariable Integer id )
    {
        return itemService.findById( id );
    }

    @CrossOrigin
    @DeleteMapping( "/{id}" )
    public void delete( @PathVariable Integer id )
    {
        itemService.delete( id );
    }

    @CrossOrigin
    @PostMapping("/add")
    public void save(  @RequestParam(name="name", required = true) String name,
                       @RequestParam(name="imageUrl", required = true) String imageUrl,
                       @RequestParam(name="style", required = true) String style,
                       @RequestParam(name="price", required = true) double price,
                       @RequestParam("imagefile") MultipartFile multipartFile) throws IOException {

        String fileName = StringUtils.cleanPath(multipartFile.getOriginalFilename());
        FileUploadUtil.saveFile(imageFolder, fileName, multipartFile);

        String fullPath = imageFolder + '/' + imageUrl;
        ItemDTO itemDto = new ItemDTO(name, fullPath, style, price);
        itemService.save(new Item(itemDto));
    }



}// end of class
