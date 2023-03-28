---
title: vector的实现
icon: edit
author:
  name: ekskei
  url: https://github.com/ekskei
date: 2019-03-01
category:
  - C/C++
tag:
  - STL
---

# vector的实现

## 原理

C++标准库中的vector是一个动态数组，具有自动扩容的功能。它的实现原理可以分为以下几个方面：

1. 内存分配：vector使用new运算符来分配内存，同时在析构函数中使用delete[]运算符来释放内存。vector在内存空间不足时会自动扩容，扩容时会重新分配一块更大的内存空间，并将原有元素复制到新的内存空间中。

2. 元素访问：vector支持随机访问，可以通过下标访问元素。vector内部使用一个指针来指向第一个元素的内存地址，通过指针加上下标的偏移量来访问指定元素的内存地址。

3. 元素插入和删除：vector支持在末尾添加元素和删除末尾元素。在插入元素时，如果vector的内存空间不足，vector会自动扩容，并将新元素插入到末尾；在删除元素时，vector会调用元素的析构函数来销毁元素，并将size减1。

4. 迭代器：vector支持迭代器，可以使用迭代器来遍历vector中的元素。vector的迭代器类型是指向元素的指针。

5. 内存分配策略：为了提高vector的性能，C++标准库中的vector通常采用了一些内存分配策略，例如预分配内存空间、空间复用、指针交换等。这些策略可以减少内存分配和复制的次数，提高vector的效率。

总的来说，C++ vector的实现原理基于动态数组，具有自动扩容的功能，并且使用一些优化策略来提高效率。

## 源码

下面是一个简化版的vector实现源码：

```C++
template<typename T>
class vector {
public:
    typedef T* iterator;

    vector() : data(nullptr), size(0), capacity(0) {}
    explicit vector(size_t n) : data(new T[n]), size(n), capacity(n) {}
    vector(const vector& other) : data(new T[other.capacity]), size(other.size), capacity(other.capacity) {
        std::copy(other.begin(), other.end(), begin());
    }
    ~vector() { delete[] data; }

    vector& operator=(const vector& other) {
        if (this != &other) {
            vector tmp(other);
            swap(tmp);
        }
        return *this;
    }

    void reserve(size_t new_capacity) {
        if (new_capacity > capacity) {
            T* new_data = new T[new_capacity];
            std::copy(begin(), end(), new_data);
            delete[] data;
            data = new_data;
            capacity = new_capacity;
        }
    }

    void resize(size_t new_size) {
        reserve(new_size);
        for (size_t i = size; i < new_size; ++i) {
            data[i] = T();
        }
        size = new_size;
    }

    void push_back(const T& value) {
        if (size == capacity) {
            reserve(capacity == 0 ? 1 : capacity * 2);
        }
        data[size++] = value;
    }

    void pop_back() {
        --size;
        data[size].~T();
    }

    void clear() {
        for (size_t i = 0; i < size; ++i) {
            data[i].~T();
        }
        size = 0;
    }

    bool empty() const { return size == 0; }
    size_t size() const { return size; }
    size_t capacity() const { return capacity; }
    T* begin() { return data; }
    T* end() { return data + size; }
    const T* begin() const { return data; }
    const T* end() const { return data + size; }

private:
    T* data;
    size_t size;
    size_t capacity;

    void swap(vector& other) {
        std::swap(data, other.data);
        std::swap(size, other.size);
        std::swap(capacity, other.capacity);
    }
};
```

在上面的实现中使用了模板类来定义vector，可以支持任意类型的元素。在vector的核心实现中使用了一个指针data来存储元素的内存地址，size表示当前元素数量，capacity表示当前vector分配的内存容量。具体实现中使用new运算符来分配内存，并且在析构函数中使用delete[]运算符来释放内存。

vector的实现中还包含了一些常用的成员函数，例如reserve、resize、push_back、pop_back和clear等，这些函数实现了vector的自动扩容和元素操作功能。

需要注意的是，以上是一个简化版的vector实现，实际上C++标准库中的vector实现相对复杂，包含了很多细节和优化。
