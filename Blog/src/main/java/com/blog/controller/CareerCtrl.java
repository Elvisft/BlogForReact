package com.blog.controller;


import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


/**
 * Created by MR-Liu on 2017/8/19.
 */
@RestController
@RequestMapping(value = "/career")
public class CareerCtrl {

    @RequestMapping(value = "/demo")
    public String getDemo(HttpServletRequest request, HttpServletResponse response){

        return "he";
    }

}
