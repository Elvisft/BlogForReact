package com.blog.mapper;

import com.blog.model.Article;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * Created by chinacscs on 2017/8/21.
 */
@Mapper
public interface ArticleMapper {
    @Select("SELECT * FROM article")
    List<Article> getAllArticle();
}
