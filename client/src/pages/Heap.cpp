#include <bits/stdc++.h>
using namespace std;

class Solution
{
public:
    string reorganizeString(string s)
    {

        map<char, int> m;
        for (auto &i : s)
        {
            m[i]++;
        }

        priority_queue<pair<int, char>> pq;

        for (auto &it : m)
        {
            pq.push(make_pair(it.second, it.first));
        }

        string ans = "";

        // IMPORTANT CONDITION -> Once we have only a single element in the queue we breakout
        while (pq.size() > 1)
        {
            char mostFreq = pq.top().second;
            pq.pop();
            char nextFreq = pq.top().second;
            pq.pop();

            ans += mostFreq;
            ans += nextFreq;

            if (m[mostFreq] - 1 > 0)
            {
                m[mostFreq] -= 1;
                pq.push(make_pair(m[mostFreq], mostFreq));
            }

            if (m[nextFreq] - 1 > 0)
            {
                m[nextFreq] -= 1;
                pq.push(make_pair(m[nextFreq], nextFreq));
            }
        }

        if (pq.size() == true)
        {
            char lastChar = pq.top().second;
            if (m[lastChar] > 1)
                return "";
            else
                ans += lastChar;
        }

        return ans;
    }
};

class Solution
{
public:
    string addStrings(string num1, string num2)
    {

        if (num1.length() == 0 or num2.length() == 0)
        {
            return num1.length() == 0 ? num2 : num1;
        }

        int i = num1.length() - 1;
        int j = num2.length() - 1;
        int carry = 0;
        string res = "";
        while (i >= 0 or j >= 0 or carry != 0)
        {
            int first = i >= 0 ? num1[i] - '0' : 0;
            int second = j >= 0 ? num2[j] - '0' : 0;

            int val = first + second + carry;

            res = to_string(val % 10) + res;
            carry = val / 10;
            i--;
            j--;
        }

        return res;
    }

    string solve(int arr[], int n)
    {
        // code here

        string num1 = "";
        string num2 = "";

        sort(arr, arr + n);

        for (int i = 0; i < n; i += 2)
        {
            num1 += to_string(arr[i]);
        }

        for (int i = 1; i < n; i += 2)
        {
            num2 += to_string(arr[i]);
        }

        string temp = addStrings(num1, num2);

        int k = 0;
        for (int i = 0; i < temp.length(); i++)
        {
            if (temp[i] != '0')
            {
                break;
            }
            k++;
        }
        n = temp.length();
        temp = temp.substr(k, n - k);
        return temp;
    }
};
