# wiestranslate

a command line translate tool
 
# Installation

```
npm install wiestranslate -g

```

# Help

```
  Usage: wing [options]

  输入要翻译的单词即可使用


  Options:

    -V, --version      output the version number
    -d, --description  欢迎使用Command翻译小助手！(by wiestlee)
    -a, --an           Add a english word
    -h, --help         output usage information


```


# Example

## English -> Zh

```
wing -a good

```
### Output

```
-- 翻译中请稍后... --
good 的翻译结果为：
adj. 好的；优良的；愉快的；虔诚的
     n. 好处；善行；慷慨的行为
     adv. 好
     n. (Good)人名；(英)古德；(瑞典)戈德

              [
                    比较级
        better
                     最高级
        best
                   ]
-- 翻译完毕 --


```
## Zh -> English

```
wing -a 好

```

### Output

```

-- 翻译中请稍后... --
好 的翻译结果为：
good
-- 翻译完毕 --

```