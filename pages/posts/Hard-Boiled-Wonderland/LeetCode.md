---
title: MyLeetCode
author: OceanPresent
time: 2021-12-29
lang: zh-CN
categories: Hard-Boiled-Wonderland
---

# MyLeetCode

## 回溯

### 组合

#### [39.组合总和](https://leetcode-cn.com/problems/combination-sum/)

方法一：

```javascript
//去重：每次只能遍历当前索引及之后的数
//回溯模板题
var combinationSum = function(candidates, target) {
    let ans = [];
    let find = function(now,vec,index){
        if(now === target){ans.push(vec.concat());return;}
        if(now > target){return;}
        for(let i = index;i < candidates.length; i++){
            now += candidates[i];
            vec.push(candidates[i]);
            find(now,vec,i);
            now -= candidates[i];
            vec.pop();
        }
    }
    find(0,[],0);
    return ans;
};
```

----

#### [40.组合总和2](https://leetcode-cn.com/problems/combination-sum-ii/)

方法一：

```javascript
//关键在于如何去重数组，预先对数组排序：if(i > start && candidates[i] === candidates[i-1]){continue;}
//防止同一递归层出现相同的数字，但不同层可以出现相同的数字
var combinationSum2 = function(candidates, target) {
    let ans = [];
    const dfs = function(now,vector,start){
        if(now === target){
            ans.push(vector.concat());
            return;
        }
        if(now > target){
            return;
        }
        for(let i = start;i < candidates.length; i++){
            if(i > start && candidates[i] === candidates[i-1]){continue;}
            now += candidates[i];
            vector.push(candidates[i]);
            dfs(now,vector,i+1);
            now -= candidates[i];
            vector.pop();
        }
    }
    candidates.sort((a,b)=>a-b);
    dfs(0,[],0);
    return ans;
};
```

----

#### [17.电话号码的字母组合](https://leetcode-cn.com/problems/letter-combinations-of-a-phone-number/)

方法一：

```javascript
//手动建了一个数字和字母对应的哈希表，每一层递归循环该数字对应的所有字母即可
	var letterCombinations = function(digits) {
    let ans = [];
    let digarr = [];
    for(let i = 0; i < digits.length; i++){
        digarr.push(Number(digits.charAt(i)));
    }
    let wordarr = [];
    wordarr[2] = ["a","b","c"];
    wordarr[3] = ["d","e","f"];
    wordarr[4] = ["g","h","i"];
    wordarr[5] = ["j","k","l"];
    wordarr[6] = ["m","n","o"];
    wordarr[7] = ["p","q","r","s"];
    wordarr[8] = ["t","u","v"];
    wordarr[9] = ["w","x","y","z"];
    const dfs = function(index,vector){
        if(index === digits.length){if(vector === "")return;ans.push(vector);return;}
        for(let i = 0; i < wordarr[digarr[index]].length; i++){
            vector += wordarr[digarr[index]][i];
            dfs(index+1,vector);
            vector = vector.slice(0,vector.length-1);
        }
    }
    dfs(0,"");
    return ans;
};
```

----

### 分割

#### [93.复原IP地址](https://leetcode-cn.com/problems/restore-ip-addresses/)

方法一：

```javascript
//每次截1~3个字符，合法就加入答案字符串
//比较重要的是要掌握好合法字符串的判断，对于合法子串要判断数字大小和除0本身外不能以0开头，还要控制子串的个数不能超过4
//字符串的回溯可以通过一个old字符串来保存原状态
var restoreIpAddresses = function(s) {
    let ans = [];
    const dfs =  function(start,vector,cnt){
        if(start === s.length && cnt === 4){
            ans.push(vector);
            return;
        }
        if(start >= s.length || cnt >= 4){return;}
        for(let i = 1; i <= 3; i++){
            let substr = s.substring(start,start + i);
            if(substr.charAt(0) === "0" && substr.length !== 1){continue;}
            if(Number(substr) >= 0 && Number(substr) <= 255){
                let old = vector;
                vector += substr;
                if(cnt < 3){vector += ".";}
                dfs(start+i,vector,cnt+1);
                vector = old;
            }
        }
    }
    dfs(0,"",0);
    return ans;
};
```

----

#### [131.分割回文串](https://leetcode-cn.com/problems/palindrome-partitioning/)

方法一：

```javascript
//好暴力的写法，居然没超时。
//判断回文：非常原始的判法
//切割字符串关键在于保存切割点，也就是每次函数执行时字符串的起点start，循环遍历往前切割的个数1~剩余长度
var partition = function(s) {
    let ans = [];
    const dfs = function(start,vector){
        if(start > s.length){return;}
        if(start === s.length){if(vector === "")return;ans.push(vector.concat());return;}
        for(let i = 1; i <= s.length - start; i++){
            let sub = s.substring(start,start + i);
            if(isHuiWen(sub)){vector.push(sub);
            dfs(start+i,vector);
            vector.pop();
            }
        }
    }
    const isHuiWen = function(str){
        let i = 0;let j = str.length-1;
        while(i < j){
            if(str.charAt(i) === str.charAt(j)){i++;j--;}
            else {return false;}
        }
        return true;
    }
    dfs(0,[]);
    return ans;
};
```

----

### 排列

#### [46.全排列](https://leetcode-cn.com/problems/permutations/)

```javascript
//非常基础的模板题
	var permute = function(nums) {
    let ans = [];
    let tmpres = [];
    rank(0);
    return ans;
    function rank(pos){
        if(pos >= nums.length){ans.push(tmpres.concat());return;}//这里要放数组的副本
        for(let x of nums){
            if(tmpres.includes(x)){continue;}
            tmpres.push(x);
            rank(pos+1);
            tmpres.pop();
        }
    }
};
```

----

#### [47.全排列II](https://leetcode-cn.com/problems/permutations-ii/submissions/)

方法一：

回溯，大部分都和组合总和2和子集2相同，关键在于去重那里多了一句 &&!visit[i-1]

```javascript
var permuteUnique = function(nums) {
    nums.sort((a,b)=>a-b);
    let ans = [];
    let visit = new Array(nums.length).fill(false);
    const dfs = function(index,vector){
        if(index === nums.length){ans.push(vector.concat());return;}
        for(let i = 0;i < nums.length; i++){
            if(i > 0 && nums[i] === nums[i-1] && !visit[i-1]){continue;}
            if(!visit[i]){
                vector.push(nums[i]);
                visit[i]=true;
                dfs(index+1,vector);
                vector.pop();
                visit[i]=false;
            }
        }
    }
    dfs(0,[]);
    return ans;
};
```

----

### 子集

#### [78.子集](https://leetcode-cn.com/problems/subsets/)

方法一：

```javascript
//本来想每次生成答案时再去重，但次数会更多。所以一开始就对原数组进行去重
//对于递归的每一层有两个可能，要么要该层的数，要么不要
var subsets = function(nums) {
    let ans = [];
    let num_set = new Set(nums);
    num_set = [...num_set];
    const dfs = function(index,vector){
        if(index === nums.length){
            ans.push(vector.concat());
            return;
        }
        for(let i = 0; i <= 1; i++){
            if(i === 0){dfs(index+1,vector);}
            if(i === 1){vector.push(nums[index]);dfs(index+1,vector);vector.pop();}
        }
    }
    dfs(0,[]);
    return ans;
};
```

----

#### [90.子集2](https://leetcode-cn.com/problems/subsets-ii/)

方法一：

```javascript
//重复数组去重和40题一样，先排序然后判断
	//这题没写出来x，在每层遍历01时遇到了点问题
	//可以注意到我在78子集1中的写法是每层有两种选择要或不要
	//但是40题的判重每层的选择是选择整个数组中的某个数，而不是某个数要或不要，生成的状态空间树不同
	//可以看到本题甚至没有写for循环，而是将0和1单独地分别地写了递归
	var subsetsWithDup = function(nums) {
    let ans = [];
    nums.sort((a,b)=>a-b);
    const dfs = function(choosepre,index,vector){
        if(index === nums.length){
            ans.push(vector.concat());
            return;
        }
        dfs(false,index+1,vector);
        if(!choosepre && index > 0 && nums[index] === nums[index-1]){return;}
        vector.push(nums[index]);
        dfs(true,index+1,vector);
        vector.pop();
    }
    dfs(false,0,[]);
    return ans;
};
```

----

## 贪心

### 简单

#### [455.分发饼干](https://leetcode-cn.com/problems/assign-cookies/)

方法一：

大的饼干优先喂给胃口大的孩子或者小的饼干优先喂给胃口小的孩子

```C
int findContentChildren(int* g, int gSize, int* s, int sSize){
int  i,j, tmp;
for(i=1;i<gSize;i++){
    tmp=g[i];
    for(j=i;j>0&&g[j-1]>tmp;j--){
        g[j]=g[j-1];
    }
    g[j]=tmp;
}
for(i=1;i<sSize;i++){
    tmp=s[i];
    for(j=i;j>0&&s[j-1]>tmp;j--){
        s[j]=s[j-1];
    }
    s[j]=tmp;
}

int num=0;
i=0;j=0;
while(i<sSize&&j<gSize){
if(s[i]>=g[j]){
    i++;j++;num++;
}
else {i++;}
}
return num;
}
```

----

#### [1005.K次取反后最大化的数组和](https://leetcode-cn.com/problems/maximize-sum-of-array-after-k-negations/)

方法一：

贪心：尽可能地翻转负数，如果次数有多余的就对绝对值最小的那个数进行翻转，有奇偶两种可能

```javascript
var largestSumAfterKNegations = function(nums, k) {
    nums.sort((a,b)=>a-b);
    let min = Infinity;
    let ans = 0;
    let cnt = 0;
    for(let i = 0; i < nums.length; i++){
        if(Math.abs(nums[i]) < Math.abs(min)){
            min = Math.abs(nums[i]);
        }
        if(nums[i] < 0 && cnt < k){
            ans -= nums[i];
            cnt ++;
        }
        else{
            ans += nums[i];
        }
    }
    if(cnt < k){
        let gap = k - cnt;
        if(gap % 2 === 0){
            return ans;
        }
        else {
            return ans -= 2 * min;
        }
    }
    return ans;
};
```

----

#### [605.种花问题](https://leetcode-cn.com/problems/can-place-flowers/)

方法一：

贪心，扫描一遍数组，对于是0的，如果前后都不为1就可以种一个花

```javascript
var canPlaceFlowers = function (flowerbed, n) {
  var num = 0
  for (var i = 0, length = flowerbed.length; i < length; i++) {
    if (flowerbed[i] === 0 && flowerbed[i - 1] !== 1 && flowerbed[i + 1] !== 1) {
      num++
      i++
    }
  }
  return n <= num
};
```

方法二：

首先要获取到所有的相邻的0，用split函数就行了，比较巧妙的地方在于用reduce函数，重点是需要观察出“相邻的n个0可以种floor （n-1）/2  个花”，归求每一段求和。

```javascript
var canPlaceFlowers = function(flowerbed, n) {
    let newflower = 0+flowerbed.join("")+0;
    newflower = newflower.split(1);
    let cnt = newflower.reduce(function(pre,cur,index,arr){
        return pre + parseInt((cur.length-1)/2);
    },0);
    return cnt >= n;
};
```

----

#### [680.验证回文字符串II](https://leetcode-cn.com/problems/valid-palindrome-ii/)

方法一：

前后双指针，找到第一对不同的字符，分别验证删去左侧字符和删去右侧字符是否符合回文串

```javascript
var validPalindrome = function(s) {
    let i = 0;
    let j = s.length - 1;
    while(i < j){
        if(s.charAt(i) === s.charAt(j)){
            i++;j--;
        }
        else {
            return isHuiWen(s,i,j-1) || isHuiWen(s,i+1,j);
        }
    }
    return true;
};
function isHuiWen(str,start,end){
    let i = start;
    let j = end;
    while(i < j){
        if(str.charAt(i) === str.charAt(j)){
            i++;j--;
        }
        else {return false;}
    }
    return true;
}
```

----

### 中等

#### [11.盛最多水的容器](https://leetcode-cn.com/problems/container-with-most-water/)

方法一：

双指针，对于任意两个板，其能装的水的体积为“最短的板长度 x 两板之间的距离”。每算完一次体积后，就需要移动左右指针，关键在于如何移动：哪边板矮就移动哪边板，因为如果移动长的板的话，按照上述体积公式，下一次最短的板长度一定不会大于当前最短的板长度，而距离一定会减小，故如果移动长的板指针就没有意义。记录一个最大值，每次将新的体积和最大值相比，取大的。

`var maxArea = function(height) {
    let ans = -Infinity;
    let left = 0;
    let right = height.length - 1;
    while(left < right){
        let minh = Math.min(height[left],height[right]);
        ans = Math.max(ans,(right-left)*minh);
        let pos = height[left]>height[right]?right--:left++;
    }
    return ans;
};`

----

## 动态规划

### 打家劫舍

#### [198.打家劫舍](https://leetcode-cn.com/problems/house-robber/)

方法一：

```javascript
var rob = function(nums) {
    let dp = [];
    dp[0] = nums[0];
    dp[1] = Math.max(nums[0],nums[1]);
    for(let i = 2; i< nums.length; i++){
        dp[i] = Math.max(nums[i]+dp[i-2],dp[i-1]);
//要么打劫当前的，加上前n-2家最大值。要么不打，就是前n-1家最大值
    }
    return dp[nums.length-1];
};
```

----

#### [213.打家劫舍II](https://leetcode-cn.com/problems/house-robber-ii/)

方法一：

围成环可以通过分类讨论转换成不成环的问题，就跟198.打家劫舍1是一样的了
如果第一家不打的话，就在2~N家里选择；第一家打的话，第N家就一定不能打，在1~N-1家里选择

```javascript
var rob = function(nums) {
  const n = nums.length
  if (n === 0) return 0
  if (n === 1) return nums[0]
  const result1 = robRange(nums, 0, n - 2)
  const result2 = robRange(nums, 1, n - 1)
  return Math.max(result1, result2);
};
const robRange = (nums, start, end) => {
  if (end === start) return nums[start]
  const dp = Array(nums.length).fill(0)
  dp[start] = nums[start]
  dp[start + 1] = Math.max(nums[start], nums[start + 1])
  for (let i = start + 2; i <= end; i++) {
    dp[i] = Math.max(dp[i - 2] + nums[i], dp[i - 1])
  }
  return dp[end];
}
```

----

### 股票问题

----

#### [121.买卖股票的最佳时机](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock/)

方法一：

只能买卖一次，因此只需要找出价格差值最大的两天即可

```javascript
var maxProfit = function(prices) {
    let minprofit = 0x3f3f3f;
    let maxprofit = 0;
    for(let i = 0; i < prices.length; i++){
        if(prices[i] < minprofit){
            minprofit = prices[i];
        }else if(prices[i] - minprofit > maxprofit){
            maxprofit = prices[i] - minprofit;
        }
    }
    return maxprofit;
};
```

----

#### [122.买卖股票的最佳时机II](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-ii/)

方法一：

贪心，只要后一天比前一天价格高就卖。因为不限制买卖次数，因此只要在赚钱，不管赚多少，最后都能拿到最大利润

```javascript
var maxProfit = function(prices) {
    let sum = 0;
    for(let i = 1; i < prices.length; i++){
        sum += Math.max(0,prices[i] - prices[i-1]);
    }
    return sum;
};
```

方法二：

动态规划，每一天的状态有两种，有股票或没有股票，要学会设置二维dp方程。

```javascript
var maxProfit = function(prices) {
    let dp = new Array(prices.length).fill(new Array(2));
    dp[0][0] = 0;dp[0][1] = -prices[0];
    for(let i = 1; i < prices.length; i++){
        dp[i][0] = Math.max(dp[i-1][0],dp[i-1][1] + prices[i]);
        dp[i][1] = Math.max(dp[i-1][1],dp[i-1][0] - prices[i]);
    }
    return dp[prices.length - 1][0];
};
```

----

### 子序列问题

#### 编辑距离

#### [392.判断子序列](https://leetcode-cn.com/problems/is-subsequence/)

方法一：

根据题目字面意思做就行了，寻找子序列s的每个字符在字符串t中的位置，记录位置，每次修改寻找t的起始位置start。如果有一个字符没找到就break循环，最后比较循环次数和s的长度。

```javascript
var isSubsequence = function(s, t) {
    let start = 0;
    for(var i = 0; i < s.length; i++){
        start = t.indexOf(s[i],start);
        //console.log(s[i],start);
        if(start === -1){break;}
        start += 1;
    }
    return i === s.length ? true : false; 
};
```

方法二：

动态规划

----

## 分治

#### [347.前K个高频元素](https://leetcode-cn.com/problems/top-k-frequent-elements/)

方法一：

对partition做了些修改，该函数将和基准相同的元素放在一边，不相同的放在另一边。然后用map进行个数统计，最后排序。

```javascript
var topKFrequent = function(nums, k) {
    partition(nums,0,nums.length-1);
    let res = [];
    let pre = 0;
    let later = 0;
    while(later <= nums.length-1){
        later = nums.lastIndexOf(nums[pre]);
        res.push({key:nums[pre],val:later-pre+1});
        pre = later + 1;
        later ++;
    }
    res.sort((a,b)=>b.val - a.val);
    let result = [];
    for(let i = 0;i < k;i ++){
        result.push(res[i].key);
    }
    return result;
};
function partition(arr,sindex,eindex){
    if(sindex > eindex){return;}
    let pivot = arr[sindex];
    let low = sindex;
    let high = eindex;
    while(low < high){
        while(low < high && arr[high] !== pivot){//右边找不同的
            high --;
        }
        arr[low] = arr[high];
        while(low < high && arr[low] === pivot){//左边找相同的
            low ++;
        }
        arr[high] = arr[low];
    }
    arr[high] = pivot;
    partition(arr,high+1,eindex);
    return;
}
```

----

## 数组

### 二分查找

----

#### [34.在排序数组中查找元素的第一个和最后一个位置](https://leetcode-cn.com/problems/find-first-and-last-position-of-element-in-sorted-array/)

方法一：

考虑 target 开始和结束位置，其实我们要找的就是数组中「第一个等于 target 的位置」（记为 leftIdx）和「第一个大于 target 的位置减一」（记为 rightIdx）。

二分查找中，寻找 leftIdx 即为在数组中寻找第一个大于等于 target 的下标，寻找 rightIdx 即为在数组中寻找第一个大于 target 的下标，然后将下标减一。两者的判断条件不同，为了代码的复用，我们定义 binarySearch(nums, target, lower) 表示在 nums 数组中二分查找 target 的位置，如果 lower 为 true，则查找第一个大于等于 target 的下标，否则查找第一个大于 target 的下标。

最后，因为target 可能不存在数组中，因此我们需要重新校验我们得到的两个下标 leftIdx 和 rightIdx，看是否符合条件，如果符合条件就返回 [leftIdx,rightIdx]，不符合就返回 [−1,−1]。

```javascript
const binarySearch = (nums, target, lower) => {
    let left = 0, right = nums.length - 1, ans = nums.length;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (nums[mid] > target || (lower && nums[mid] >= target)) {
            right = mid - 1;
            ans = mid;
        } else {
            left = mid + 1;
        }
    }
    return ans;
}
var searchRange = function(nums, target) {
    let ans = [-1, -1];
    const leftIdx = binarySearch(nums, target, true);
    const rightIdx = binarySearch(nums, target, false) - 1;
    if (leftIdx <= rightIdx && rightIdx < nums.length && nums[leftIdx] === target && nums[rightIdx] === target) {
        ans = [leftIdx, rightIdx];
    } 
    return ans;
};
```

### 移除元素

#### [27.移除元素](https://leetcode-cn.com/problems/remove-element/)

方法一：

双指针。关键在于保留和覆盖，快指针用于检测，慢指针用于操作。

```javascript
var removeElement = function(nums, val) {
    let lowindex = 0;
    let fastindex = 0;
    for(fastindex;fastindex < nums.length; fastindex++){
        if(nums[fastindex] !== val){
            nums[lowindex] = nums[fastindex];
            lowindex++;
        }
    }
    return lowindex;
};
```

----

#### [977.有序数组的平方](https://leetcode-cn.com/problems/squares-of-a-sorted-array/)

方法一：

双指针。因为数组升序，因此左边是最小的，右边是最大的。两端的数平方后比大小一定能拿到最大的，最后倒序即可。

```javascript
var sortedSquares = function(nums) {
    let left = 0;
    let right = nums.length-1;
    let ans = [];
    while(left <= right){
        let _new = Math.abs(nums[left]) > Math.abs(nums[right]) ? Math.pow(nums[left],2) : Math.pow(nums[right],2);
        ans.push(_new);
        Math.abs(nums[left]) > Math.abs(nums[right]) ? left++ : right--; 
    }
    return ans.reverse();
};
```

----

### 滑动窗口

#### [209.长度最小的子数组]()

方法一：

双指针，左右指针框出了连续子数组的范围。每一次先让右指针不断向右直到数组和大于等于target，此时只是找到了满足提议的子数组，然后让左指针尽可能向右移动直到数组和小于target，即尽可能缩小子数组长度。每次缩小完子数组后和最小值进行比较。

```javascript
var minSubArrayLen = function(target, nums) {
    let left = 0;
    let right = 0;
    let ans = Infinity;
    let sum = 0;
    while(left <= right && right < nums.length){
        while(sum < target){
            sum += nums[right];
            right++;
        }
        while(sum >= target){
            sum -= nums[left];
            left++;
        }
        if(ans > right - left + 1){ans = right - left + 1;}
    }
    return flag === Infinity ? 0 : ans;
};
```

----

#### [904.水果成篮](https://leetcode-cn.com/problems/fruit-into-baskets/)

方法一：

自己奋战的结果，无论是时间还是空间效率都极差=。=、

原理还是滑动窗口。本题翻译翻译就是最多包含两种不同数据的最长连续子数组。窗口的结束位置只要不断向右扩展即可，问题在于左边的如何修改，当已经有了两种数据再遇到不同的数据时，right-1一定是已经在篮子里的，我们要向左寻找所有相邻的该类型数据，以他们为left的边界。

```javascript
var totalFruit = function(fruits) {
    let left = 0;
    let right = 0;
    let ans = 0;
    let mybag = new Map();
    for(right;right < fruits.length; right++){
        if(!mybag.has(fruits[right])){
            if(mybag.size < 2){
                mybag.set(fruits[right],1);
                if(ans < right - left+1){ans = right - left+1;}
            }else{
                if(ans < right - left){ans = right - left;}
                let old = fruits[right-1];
                left = right-1;
                while(left>=0 && fruits[left] === old){
                    left--;
                }
                left++;
                for(let key of mybag.keys()){
                    if(key !== old){mybag.delete(key);break;}
                }
                mybag.set(fruits[right],1);
            }
        }else{
            if(ans < right - left+1){ans = right - left+1;}
        }
        console.log(mybag,ans);
    }
    return ans;
};
```

方法二：

----

#### [3. 无重复字符的最长子串](https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/)

方法一：

滑动窗口的优化。每次移动窗口左指针时，需要把最左边的一段子串删去，因此可以利用splice函数。

```javascript
var lengthOfLongestSubstring = function(s) {
    let arr = [];
    let max = 0;
    for (let i = 0; i < s.length; i ++) {
        //如果之前存在，就删除，知道没有为止
        if(arr.indexOf(s[i]) !== -1) {
            arr.splice(0, arr.indexOf(s[i]) + 1);
        }
        //加入当前元素
        arr.push(s[i]);
        //取最大
        max = Math.max(max, arr.length);
    }
    return max;
};
```

方法二：

滑动窗口

```javascript
var lengthOfLongestSubstring = function(s) {
    // 哈希集合，记录每个字符是否出现过
    const occ = new Set();
    const n = s.length;
    // 右指针，初始值为 -1，相当于我们在字符串的左边界的左侧，还没有开始移动
    let rk = -1, ans = 0;
    for (let i = 0; i < n; ++i) {
        if (i != 0) {
            // 左指针向右移动一格，移除一个字符
            occ.delete(s.charAt(i - 1));
        }
        while (rk + 1 < n && !occ.has(s.charAt(rk + 1))) {
            // 不断地移动右指针
            occ.add(s.charAt(rk + 1));
            ++rk;
        }
        // 第 i 到 rk 个字符是一个极长的无重复字符子串
        ans = Math.max(ans, rk - i + 1);
    }
    return ans;
};
```

----

### 模拟行为

#### [59.螺旋矩阵II](https://leetcode-cn.com/problems/spiral-matrix-ii/)

方法一：

模拟一遍遍画圈的行为，要保持写代码的原则不变，要么每次左开右闭，要么左闭右开，不能一会使用这个原则，一会换别的原则。

```javascript
var generateMatrix = function(n) {
    let startX = 0;
    let startY = 0;
    let loop = Math.floor(n / 2);//画圈次数
    let mid = Math.floor(n / 2);//中心点
    let sideLength = n - 1;//填充的每条边边长
    let ans = new Array(n).fill(0).map(() => new Array(n).fill(0));
    let cnt = 1;//计数
    while(loop--){
        //从左到右
        let i = startX;
        let j = startY;
        for(j;j < startY + sideLength; j++){
            ans[i][j] = cnt++;
        }
        //从上到下
        for(i; i < startX + sideLength; i++){
            ans[i][j] = cnt++;
        }
        //从右到左
        for(j;j > startY; j--){
            ans[i][j] = cnt++;
        }
        //从下到上
        for(i;i > startX; i--){
            ans[i][j] = cnt++;
        }
        startX++;startY++;sideLength -=2;
    }
    if(n % 2 === 1){
        ans[mid][mid] = cnt;
    }
    return ans;
};
```

----

## 链表

#### [206.翻转链表]()

方法一：

第一次写的用递归来翻转。写递归的一个技巧：脑中只压一次栈，把递归函数返回的结果看做操作已完成自己需要的结果就行了；思考递归详细过程再去想怎么写递归反而写不出来。**通过结果得到过程** 。

假设我们有头元素，我们将头元素后面n-1个元素的链表翻转。此时头元素的next指向的就是翻转后的n-1链表，头元素next的next就是翻转后的链表的最后一个元素（因为链表已经翻转了），我们让该元素的next指向头元素，再把头元素的next设为null，就把n-1个元素的翻转链表变成了n个元素的翻转链表。 

```javascript
var reverseList = function(head) {
    const getReverse = function(h){
        if(!h){return null;}
        if(!h.next){return h;}
        let last = getReverse(h.next);
        h.next.next = h;
        h.next = null;
        return last;
    }
    return getReverse(head);
};
```

方法二：

双指针。每次先记录cur指针的next，然后让cur的next指向前一个元素。随后把pre和cur指针向前移动一格。

```javascript
var reverseList = function(head) {
    let cur = head;
    let pre = null;
    while(cur){
        let temp = cur.next;
        cur.next = pre;
        pre = cur;
        cur = temp;
    }
    return pre;
};
```

----

#### [92. 反转链表 II](https://leetcode-cn.com/problems/reverse-linked-list-ii/)

方法一：

使用「[206. 反转链表](https://leetcode-cn.com/problems/reverse-linked-list/)」的解法，反转 `left` 到 `right` 部分以后，再拼接起来。

```javascript
var reverseBetween = function(head, left, right) {
    // 因为头节点有可能发生变化，使用虚拟头节点可以避免复杂的分类讨论
    const dummyNode = new ListNode(-1);
    dummyNode.next = head;
    let pre = dummyNode;
    // 第 1 步：从虚拟头节点走 left - 1 步，来到 left 节点的前一个节点
    // 建议写在 for 循环里，语义清晰
    for (let i = 0; i < left - 1; i++) {
        pre = pre.next;
    }
    // 第 2 步：从 pre 再走 right - left + 1 步，来到 right 节点
    let rightNode = pre;
    for (let i = 0; i < right - left + 1; i++) {
        rightNode = rightNode.next;
    }
    // 第 3 步：切断出一个子链表（截取链表）
    let leftNode = pre.next;
    let curr = rightNode.next;
    // 注意：切断链接
    pre.next = null;
    rightNode.next = null;
    // 第 4 步：同第 206 题，反转链表的子区间
    reverseLinkedList(leftNode);
    // 第 5 步：接回到原来的链表中
    pre.next = rightNode;
    leftNode.next = curr;
    return dummyNode.next;
};

const reverseLinkedList = (head) => {
    let pre = null;
    let cur = head;
    while (cur) {
        const next = cur.next;
        cur.next = pre;
        pre = cur;
        cur = next;
    }
}
```

方法二：

在需要反转的区间里，每遍历到一个节点，让这个新节点来到反转部分的起始位置。

``` javascript
var reverseBetween = function(head, left, right) {
    if(!head || !head.next){return head;}
    let guide = new ListNode();
    guide.next = head;
    let pre = guide;
    for(let i = 0; i < left - 1; i++){
        pre = pre.next;
    }
    let cur = pre.next;
    let next = cur.next;
    for(let i = left; i < right; i++){
        let tmp = next.next;
        next.next = cur;
        //cur.next = null;
        cur = next;
        next = tmp;
    }
    pre.next.next = next;
    pre.next = cur;
    return guide.next;
};
```

----

#### [142. 环形链表 II](https://leetcode-cn.com/problems/linked-list-cycle-ii/)

方法一：

```javascript
//先判断有没有环：快慢指针同时走看是否相遇。
 //快慢指针走的步数是关键，快指针走的步数是慢指针的两倍。画图可以更直观地观察
 //注意到：环结点再走slowcnt步就会重新到达环结点
var detectCycle = function(head) {
    let slow = head;
    let fast = head;
    let slowcnt = 0;let fastcnt = 0;
    if(!head || !head.next){return null;}
    while(slow && fast){
        slow = slow.next;slowcnt++;
        fast = fast.next;fastcnt++;
        if(fast){fast = fast.next;fastcnt++;}
        if(fast === slow){break;}
    }
    if(!slow || !fast){return null;}
    slow = head;fast = head;
    for(let i = 0; i < slowcnt; i++){fast = fast.next;}
    while(slow !== fast){slow = slow.next;fast = fast.next;}
    return slow;
};
```

----

#### [24. 两两交换链表中的节点](https://leetcode-cn.com/problems/swap-nodes-in-pairs/)

方法一：

```javascript
 //递归，依旧是从结果推过程
var swapPairs = function(head) {
    if(!head || !head.next){return head;}
    let next = head.next;
    let other = swapPairs(next.next);
    next.next = head;
    head.next = other;
    return next;
};
```

方法二：

用迭代正常模拟，画图可以帮助理解。

```javascript
var swapPairs = function (head) {
  let ret = new ListNode(0, head), temp = ret;
  while (temp.next && temp.next.next) {
    let cur = temp.next.next, pre = temp.next;
    pre.next = cur.next;
    cur.next = pre;
    temp.next = cur;
    temp = pre;
  }
  return ret.next;
};
```

----

#### [160. 相交链表](https://leetcode-cn.com/problems/intersection-of-two-linked-lists/)

方法一：

分别获取两条链表的长度，得到长度之差dist。让长的那边指针先走dist步，然后两指针同时前进，若相遇则是相交结点；不相遇（都是nulll）则不相交、

```javascript
var getIntersectionNode = function(headA, headB) {
    let cntA = 0;let cntB = 0;
    let posA = headA;
    while(posA){posA = posA.next;cntA++;}
    let posB = headB;
    while(posB){posB = posB.next;cntB++;}
    let dist = Math.abs(cntB - cntA);
    posA = headA;posB = headB;
    if(cntB > cntA){
        for(let i = 0;i < dist; i++){posB = posB.next;}
    }
    if(cntA > cntB){
        for(let i = 0;i < dist; i++){posA = posA.next;}
    }
    while(posA && posB && posB !== posA){posA = posA.next;posB = posB.next;}
    return posB;
};
```

方法二：

哈希表，将链表A存入set中，第一个相同的节点就是重合的节点。

```javascript
var getIntersectionNode = function(headA, headB) {
    const visited = new Set();
    let temp = headA;
    while (temp !== null) {//将链表A存入set中
        visited.add(temp);
        temp = temp.next;
    }
    temp = headB;
    while (temp !== null) {
        if (visited.has(temp)) {//第一个相同的节点就是重合的节点
            return temp;
        }
        temp = temp.next;
    }
    return null;
};
```

----

#### [19. 删除链表的倒数第 N 个结点](https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list/)

方法一：

简简单单地用了一下[19. 删除链表的倒数第 N 个结点](https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list/) 的API。

```javascript
var removeNthFromEnd = function(head, n) {
    //设置一个哨兵结点，头结点的判断就方便了
    let guide = new ListNode();
    guide.next = head;
    let fast = guide;let slow = guide;
    for(let i = 0; i <= n; i++){
        fast = fast.next;
    }
    while(fast){
        fast = fast.next;
        slow = slow.next;
    }
    //此时slow指向的是倒数n+1个节点
    if(slow.next === head){return head.next;}
    slow.next = slow.next.next;
    return head;
};
```

----

#### [146. LRU 缓存](https://leetcode-cn.com/problems/lru-cache/)

方法一：

哈希表（map）+双向链表。模拟操作即可，一定要细心。

```javascript
class ListNode{
    constructor(key,val){
        this.key = key;
        this.val = val;
        this.pre = null;
        this.next = null;
    }
}

var LRUCache = function(capacity) {
    this.data = new Map();
    this.capacity = capacity;
    this.size = 0;
    this.ListHead = new ListNode();
    this.ListTail = new ListNode();
    this.ListHead.next = this.ListTail;
    this.ListTail.pre = this.ListHead;
};

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function(key) {
    if(this.data.has(key)){
        let node = this.data.get(key);
        this.moveToHead(node);
        return node.val;
    }else{
        return -1;
    }
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function(key, value) {
    if(this.data.has(key)){
        let old = this.data.get(key);
        this.moveToHead(old);
        old.val = value;
    }else{
        let newnode = new ListNode(key,value);
        this.data.set(key,newnode);
        this.moveToHead(newnode);
        this.size++;
        if(this.size > this.capacity){
            this.popTail();
        }
    }
};

LRUCache.prototype.moveToHead = function(node){
    if(node.next)node.next.pre = node.pre;
    if(node.pre)node.pre.next = node.next;
    node.next = this.ListHead.next;
    node.pre = this.ListHead;
    this.ListHead.next.pre = node;
    this.ListHead.next = node;
};

LRUCache.prototype.popTail = function(){
    let last = this.ListTail.pre;
    last.pre.next = this.ListTail;
    this.ListTail.pre = last.pre;
    this.data.delete(last.key);
    this.size--;
}
```

----

## 哈希表

#### [349. 两个数组的交集](https://leetcode-cn.com/problems/intersection-of-two-arrays/)

方法一：

用set装然后比较=。=、

```javascript
var intersection = function(nums1, nums2) {
    let uset = new Set();
    nums1.forEach((val,index,arr)=>{
        uset.add(val);
    });
    let ans = new Set();
    nums2.forEach((val,index,arr)=>{
        if(uset.has(val)){
            ans.add(val);
        }
    });
    return [...ans];
};
```

----

#### [242. 有效的字母异位词](https://leetcode-cn.com/problems/valid-anagram/)

方法一：

字符的哈希表直接用容量为26的数组即可。遍历两个字符串，一遍加一遍减。最后检查一下，**record数组如果有的元素不为零0，说明字符串s和t一定是谁多了字符或者谁少了字符，return false**

```javascript
var isAnagram = function(s, t) {
    if(s.length !== t.length){return false;}
    let ans = new Array(26).fill(0);
    let base = 'a'.charCodeAt(0);
    for(let i = 0; i < s.length; i++){
        ans[s.charCodeAt(i) - base]++;
        ans[t.charCodeAt(i) - base]--;
    }
    let res = ans.filter((val)=>val !== 0);
    return res.length === 0 ? true : false;
};
```

方法二：

转为数组，排序，然后转为字符串，对比即可。

----

#### [202. 快乐数](https://leetcode-cn.com/problems/happy-number/)

方法一：

题目中说了会 **无限循环**，那么也就是说**求和的过程中，sum会重复出现，这对解题很重要！**使用哈希法，来判断这个sum是否重复出现，如果重复了就是return false， 否则一直找到sum为1为止。

```javascript
var isHappy = function(n) {
    const getSum = (nn)=>{
        let sum = 0;
        while(nn){
            let tmp = nn % 10;
            sum += tmp*tmp;
            nn = Math.floor(nn / 10);
        }
        return sum;
    }
    let numSet = new Set();
    let res = n;
    while((res = getSum(res)) !== 1){
        if(numSet.has(res))return false;
        numSet.add(res);
    }
    return true;
};
```

----

#### [15. 三数之和](https://leetcode-cn.com/problems/3sum/)

方法一：

特判，对于数组长度 n，如果数组为 null 或者数组长度小于 3，返回 [][]。
对数组进行排序。
遍历排序后数组：
若 nums[i]>0：因为已经排序好，所以后面不可能有三个数加和等于 0，直接返回结果。
对于重复元素：跳过，避免出现重复解
令左指针 L=i+1，右指针 R=n−1，当 L<R 时，执行循环：
当 nums[i]+nums[L]+nums[R]==0，执行循环，判断左界和右界是否和下一位置重复，去除重复解。并同时将 L,R 移到下一位置，寻找新的解
若和大于 0，说明 nums[R]太大，R左移
若和小于 0，说明 nums[L]太小，L 右移

```javascript
var threeSum = function(nums) {
    if(nums === null || nums.length < 3){return [];}
    nums.sort((a,b)=>a-b);
    let ans = [];
    let sum = 0;
    for(let i = 0; i < nums.length; i++){
        if(i>0 && nums[i]===nums[i-1])continue;
        let left = i + 1;let right = nums.length - 1;
        while(right >= 0 && left <= nums.length-1 && left < right){
            sum = nums[i] + nums[left] + nums[right];
            if(sum > 0){right--;}
            if(sum < 0){left++;}
            if(sum === 0){
                ans.push([nums[i],nums[left],nums[right]]);
                while(left < right && nums[left] === nums[left+1])left++;
                while(left < right && nums[right] === nums[right-1])right--;
                left++;right--;
            }
        }
    }
    return ans;
};
```

----

#### [18. 四数之和](https://leetcode-cn.com/problems/4sum/)

方法一：

双指针，基本解法就是在[15.三数之和 (opens new window)](https://programmercarl.com/0015.三数之和.html)的基础上再套一层for循环。注意需要去重两次，不过去重的方法都是一样的。

```javascript
var fourSum = function(nums, target) {
    const len = nums.length;
    if(len < 4) return [];
    nums.sort((a, b) => a - b);
    const res = [];
    for(let i = 0; i < len - 3; i++) {
        // 去重i
        if(i > 0 && nums[i] === nums[i - 1]) continue;
        for(let j = i + 1; j < len - 2; j++) {
            // 去重j
            if(j > i + 1 && nums[j] === nums[j - 1]) continue;
            let l = j + 1, r = len - 1;
            while(l < r) {
                const sum = nums[i] + nums[j] + nums[l] + nums[r];
                if(sum < target) { l++; continue}
                if(sum > target) { r--; continue}
                res.push([nums[i], nums[j], nums[l], nums[r]]);
                while(l < r && nums[l] === nums[++l]);
                while(l < r && nums[r] === nums[--r]);
            }
        } 
    }
    return res;
};
```

## 字符串

### [151. 颠倒字符串中的单词](https://leetcode-cn.com/problems/reverse-words-in-a-string/)

方法一：

JavaScript中的字符串并不是引用类型，想要在源字符串上操作往往要转换成数组。先去除空格，包括头、尾，注意单词间的空格需要留一个。因为尾的去空格方法和中间的相同，所以如果尾部有空格最终会被留下来一个，需要人为判断删除。

然后进行依次遍历，记录每个单词的长度将单词部分翻转即可。

```javascript
/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function(s) {
    function reversePart(strArr,l,r){
        while(l < r){
            [strArr[l],strArr[r]] = [strArr[r],strArr[l]]
            l++
            r--  
        }
    }
    function skipWhite(strArr){
        let fast = 0
        let slow = 0
        let count = 0
        while(strArr[fast] === " "){
            fast++
            count++
        }
        while(slow <= fast && fast < strArr.length){
            while(strArr[fast] === " " && strArr[fast-1] === " "){
                fast++
                count++
            }
            strArr[slow++] = strArr[fast++]
        }
        strArr.length = strArr.length - (strArr[strArr.length-1] === " " ? count+1 : count)
        return strArr
    }
    let arr = Array.from(s)
    skipWhite(arr)
    //console.log(arr)
    reversePart(arr,0,arr.length-1)
    let start = 0
    for(let i = 0; i < arr.length; i++){
        if(arr[i] === " "){
            reversePart(arr,start,i-1)
            start = i+1
        }
    }
    reversePart(arr,start,arr.length-1)
    return arr.join("")
};
```

### [剑指 Offer 58 - II. 左旋转字符串](https://leetcode-cn.com/problems/zuo-xuan-zhuan-zi-fu-chuan-lcof/)

方法一：

以n为边界，分别将左右两边翻转，然后再整体翻转

```javascript
/**
 * @param {string} s
 * @param {number} n
 * @return {string}
 */
var reverseLeftWords = function(s, n) {
    function reversePart(strArr,l,r){
        while(l < r){
            [strArr[l],strArr[r]] = [strArr[r],strArr[l]]
            l++
            r--  
        }
    }
    let arr = Array.from(s)
    reversePart(arr,0,n-1)
    reversePart(arr,n,arr.length-1)
    reversePart(arr,0,arr.length-1)
    return arr.join("")
};
```

方法二：

我不好说

```javascript
/**
 * @param {string} s
 * @param {number} n
 * @return {string}
 */
var reverseLeftWords = function(s, n) {
    return s.slice(n,s.length) + s.slice(0,n)
};
```

