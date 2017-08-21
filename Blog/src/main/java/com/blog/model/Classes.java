package com.blog.model;

public class Classes {
  private Long id;
  private String type;
  private String name;
  private Long parent_id;

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getType() {
    return type;
  }

  public void setType(String type) {
    this.type = type;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public Long getParent_id() {
    return parent_id;
  }

  public void setParent_id(Long parent_id) {
    this.parent_id = parent_id;
  }

  @Override
  public String toString(){
    return "id"+this.getId()+"***"+"name"+this.getName()+"***"+"type"+this.getType();
  }
}
