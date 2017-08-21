package com.blog.controller;

import com.blog.model.Classes;
import com.blog.mapper.ClassesMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.testng.annotations.Test;

import java.util.List;

/**
 * Created by MR-Liu on 2017/8/21.
 */
@Controller
public class ClassesCtrl {
    @Autowired
    private ClassesMapper classesMapper;

    @Test
    public void test(){
        System.out.print("123");
        List<Classes> list = classesMapper.getAllClasses();
        for(int i=0;i<list.size();i++){
            System.out.println(list.get(i).toString());
        }
    }
}
