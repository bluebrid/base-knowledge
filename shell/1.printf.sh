#!/bin/bash
# https://www.cnblogs.com/f-ck-need-u/p/5915076.html 
printf "%-5s %-10s %-4s\n" No Name Mark     # 三个%分别对应后面的三个参数
printf "%-5s %-10s %-4.2f\n" 1 Sarath 80.34 # 减号“-”表示左对齐
printf "%-5s %-10s %-4.2f\n" 2 James 90.998 # 5s表示第一个参数占用5个字符
printf "%-5s %-10s %-4.2f\n" 3 Jeff 77.564
