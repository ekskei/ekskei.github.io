---
title: shared_ptr智能指针
icon: edit
author:
  name: ekskei
  url: https://github.com/ekskei
date: 2019-03-28
category:
  - C/C++
tag:
  - 指针
---

# shared_ptr智能指针

C++中的shared_ptr是一种智能指针，它是通过引用计数来管理动态内存的。shared_ptr的实现过程可以简单地概括为以下几个步骤：

1. 创建一个shared_ptr对象时，它会初始化一个引用计数，该计数初始化为1，并将指针指向动态内存。

2. 当一个shared_ptr对象被复制时，它的引用计数会增加1。这是通过将新的shared_ptr对象的引用计数指向原始对象的引用计数来实现的。

3. 当一个shared_ptr对象被销毁时，它的引用计数会减少1。如果引用计数变为0，则意味着没有任何shared_ptr对象引用该动态内存，此时会自动释放该动态内存。

4. 当一个shared_ptr对象被赋值给另一个shared_ptr对象时，它们共享同一个引用计数。这是通过将两个shared_ptr对象的引用计数指向同一个对象来实现的。

shared_ptr对象还提供了自定义删除器的功能，可以在释放动态内存时调用指定的删除器函数。

具体实现上，shared_ptr对象内部有一个指向控制块的指针，控制块包含了引用计数和指向动态内存的指针。每个shared_ptr对象都共享同一个控制块，通过引用计数来管理动态内存的生命周期。

shared_ptr的实现还使用了模板和模板特化的技术，使得它可以适用于不同类型的动态内存。此外，shared_ptr还采用了线程安全的引用计数实现，以保证多线程环境下的正确性。

下面是一个使用原子操作实现的线程安全的shared_ptr类的源码示例：

```C++
#include <atomic>
#include <iostream>

template <typename T>
class SharedPtr {
public:
    SharedPtr() : ptr(nullptr), ref_count(new std::atomic<int>(1)) {}
    SharedPtr(T* p) : ptr(p), ref_count(new std::atomic<int>(1)) {}
    SharedPtr(const SharedPtr<T>& other) : ptr(other.ptr), ref_count(other.ref_count) {
        if (ref_count) {
            ++(*ref_count);
        }
    }
    ~SharedPtr() {
        if (ref_count && --(*ref_count) == 0) {
            delete ptr;
            delete ref_count;
        }
    }

    SharedPtr<T>& operator=(const SharedPtr<T>& other) {
        if (this != &other) {
            if (ref_count && --(*ref_count) == 0) {
                delete ptr;
                delete ref_count;
            }
            ptr = other.ptr;
            ref_count = other.ref_count;
            if (ref_count) {
                ++(*ref_count);
            }
        }
        return *this;
    }

    T* operator->() const { return ptr; }
    T& operator*() const { return *ptr; }

    int use_count() const { return ref_count ? *ref_count : 0; }

private:
    T* ptr;
    std::atomic<int>* ref_count;
};

```

在上面的实现中，我们使用了`std::atomic<int>`来定义引用计数，从而保证了线程安全。具体实现时，在shared_ptr的构造函数中，我们使用`new std::atomic<int>(1)`来创建一个初始值为1的`std::atomic<int>`对象，然后在拷贝构造函数、析构函数、赋值操作等中使用原子操作来更新引用计数。

需要注意的是，由于`std::atomic<T>`对象的构造和析构是线程安全的，因此我们可以在构造函数和析构函数中直接使用new和delete来分配和释放`std::atomic<int>`对象的内存，而不需要使用互斥锁或者其他线程安全的手段。

使用上述实现方式，我们可以在多线程环境下安全地使用shared_ptr，而不需要担心线程安全问题。
