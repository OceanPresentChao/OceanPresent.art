---
title: Rustlings-2023-Autumn
author: OceanPresent
time: '2023-10-16'
lang: zh-CN
---
[[toc]]
# 前言

> 课程使用教材
> - [https://doc.rust-lang.org/book/title-page.html](https://doc.rust-lang.org/book/title-page.html)
> - [https://rustwiki.org/en/rust-by-example/index.html](https://rustwiki.org/en/rust-by-example/index.html) 
> - [https://course.rs/about-book.html](https://course.rs/about-book.html)
> - [https://cheats.rs/](https://cheats.rs/)
> - [https://doc.rust-lang.org/std/index.html](https://doc.rust-lang.org/std/index.html)

# Day 1
## 进度
完成Rustlings: intro ~ hashmap + quiz1 ~ quiz2
## 笔记
### format
打印时常用的宏：

- format!: write formatted text to String
- print!: same as format! but the text is printed to the console (io::stdout).
- println!: same as print! but a newline is appended.
- eprint!: same as print! but the text is printed to the standard error (io::stderr).
- eprintln!: same as eprint! but a newline is appended.
### variable
const声明变量必须要标注类型，赋予初始值，初始值必须是const表达式
### array
array如果想要统一填充初始值，可以使用如下语法：
```rust
let a: [u32; 100] = [0; 100];
```
### ownership
Each value in Rust has an owner.
There can only be one owner at a time.
When the owner goes out of scope, the value will be dropped.
# Day2
## 进度
完成Rustlings: options ~ iterators + quiz3
## 笔记
### trait
patterns aren't allowed in functions without bodies
实现函数时可以加mut或不加，函数声明时不能添加pattern
```rust
trait AppendBar {
    fn append_bar(mut self) -> Self;// NO!
    fn append_bar(self) -> Self;// YES!
}
```
# Day3
## 进度
完成Rustlings: smart_pointers ~ conversions + tests
做完96道题发现做错题集了，补上了额外的tests，还有个别题不太一样重新做了遍
完结撒花～
![abb76494114d3f4848ff2075c9ce45d2.png](https://cdn.nlark.com/yuque/0/2023/png/34848238/1697131618100-ed5a9ec2-58aa-4bf6-9ad3-8ecf578ae8f5.png#averageHue=%2313161b&clientId=ud95b07bd-b5cb-4&from=paste&height=372&id=ub64c22b8&originHeight=744&originWidth=1304&originalType=binary&ratio=2&rotation=0&showTitle=false&size=76394&status=done&style=none&taskId=u96eceb5c-14f9-4cf8-93c7-57307620f78&title=&width=652)
## 笔记
### cow
Cow 特征是 Rust 语言中的一个标准库特性，用于处理读写分离的数据结构。Cow 类型有两种形式：
Cow::Borrowed(&'a T): 表示一个不可变的引用，可以用于读取数据；
Cow::Owned(T): 表示一个可变的数据，可以用于修改数据。
Cow 类型的克隆操作是惰性的，只有在修改数据时才会进行克隆操作。这种惰性的克隆操作可以避免不必要的内存分配和复制操作，从而提高程序的性能和效率。
### iter
iter(): 这个方法返回一个迭代器，它对Vec的元素进行不可变引用。这意味着您可以使用iter()迭代Vec的元素，但不能修改它们。
into_iter(): 这个方法会消耗Vec，并返回一个拥有Vec元素所有权的迭代器。这意味着Vec在使用into_iter()后将不再可用，因为它的元素已经被迭代器获取了。
### clone
clone() 方法：
clone() 是一个通用的方法，适用于任何类型，包括具有 Clone trait 的类型。
当使用 clone() 时，它会深度克隆（deep clone）迭代器中的每个元素。
如果元素类型没有实现 Clone trait，编译器将产生错误。
```rust
let original_vec = vec![String::from("Hello"), String::from("World")];
let cloned_vec: Vec<String> = original_vec.iter().map(|s| s.clone()).collect();
```
cloned() 方法：
cloned() 是特定于迭代器的方法，适用于实现了 Clone trait 的类型。
cloned() 方法执行浅克隆（shallow clone），它将每个元素的 &T（引用）转换为 T 的克隆。
如果元素类型没有实现 Clone trait，cloned() 仍然可以工作，因为它执行的是浅克隆。
```rust
let original_vec = vec![String::from("Hello"), String::from("World")];
let cloned_vec: Vec<String> = original_vec.iter().cloned().collect();
```
### as_ref_mut
AsRef`<str>`这个泛型约束表示这个函数接收所有可以转换&str的类型的实参
### FFI
FFI(Foreign Function Interface)是用来与其它语言交互的接口，在有些语言里面称为语言绑定(language bindings)
在其他语言调用Rust
extern关键字表明函数是给哪个语言用的
```rust
#[no_mangle]
pub extern "C" fn call_from_c() {
    println!("Just called a Rust function from C!");
}
```
Rust调用其他语言
extern关键字表明函数源自于哪个语言
```rust
extern "C" {
    fn abs(input: i32) -> i32;
}

fn main() {
    unsafe {
        println!("Absolute value of -3 according to C: {}", abs(-3));
    }
}
```
