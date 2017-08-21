package com.blog.mapper;

import com.blog.model.Classes;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * Created by chinacscs on 2017/8/21.
 */
@Mapper
public interface ClassesMapper {
    @Select("SELECT * FROM classes")
    List<Classes> getAllClasses();
}
