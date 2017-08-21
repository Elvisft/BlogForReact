package com.blog.controller;


import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;


/**
 * Created by MR-Liu on 2017/8/19.
 */
@Controller
@RequestMapping(value = "/career")
public class CareerCtrl {

    @RequestMapping(value = "/demo")
    public Map<String, String> getDemo(HttpServletRequest request, HttpServletResponse response){
        Map<String, String> map = new HashMap<String, String>();
        map.put("name","qwe");
        return map;
    }

}
