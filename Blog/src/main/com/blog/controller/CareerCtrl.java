package main.com.blog.controller;


import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by MR-Liu on 2017/8/19.
 */
@RestController
@RequestMapping(value = "/career")
public class CareerCtrl {

    @RequestMapping(value = "/demo")
    public String getDemo(){
        return "he";
    }
}
