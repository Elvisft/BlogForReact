package com.blog;

import com.blog.mapper.ClassesMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import com.blog.util.CrossInterceptor;
/**
 * Created by MR-Liu on 2017/8/19.
 */
@SpringBootApplication
@ServletComponentScan
public class Application {


    private ClassesMapper classesMapper;
    public Application(ClassesMapper classesMapper) {
        this.classesMapper = classesMapper;
    }

    public static void main(String[] args){
        SpringApplication.run(Application.class, args);
    }


    @Configuration
    static class WebMvcConfigurer extends WebMvcConfigurerAdapter {
        @Autowired
        private CrossInterceptor crossInterceptor;
        @Override
        public void addInterceptors(InterceptorRegistry registry) {
            registry.addInterceptor(crossInterceptor).addPathPatterns("/**");
            super.addInterceptors(registry);
        }
    }
}
