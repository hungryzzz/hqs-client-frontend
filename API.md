# API

> /api/login
- method: POST
- request:
```
{
  email: "xx",
  password: "xx"
}
```

> /api/logout
- method: GET


> /api/getPoList
- method: GET
- response:
```
# 一条数据表示一个line，同一个sort的放一起，每个sort的第一个line有一个line_sum表示这个sort总共有几个line
# 其余字段可以不是string，看你
[
  {
    id: "sdjksjdk",
    status: "CLOSE",
    "po_num": "490032832189",
    "sort_num": "102407",
    "part_num": ["15645243-97-B", "15645243-97-C"],
    "start_date": "10/26/21",
    "line_num": "10",
    "po_date": "10/26/21",
    "po_stop_date": "11/26/21",
    "unit_price": "$3.45",
    "part_limit": "2800",
    "line_amount": "$43934.00",
    "part_completed": "2800",
    "part_remaining": "0",
    "remaining": "0.00",
    "line_sum": 4,
  },
  {
    id: "sdj029301jdk",
    status: "CLOSE",
    "po_num": "490032832189",
    "sort_num": "102407",
    "part_num": ["15645243-97-B", "15645243-97-C"],
    "start_date": "10/26/21",
    "line_num": "30",
    "po_date": "11/26/21",
    "po_stop_date": "12/26/21",
    "unit_price": "$3.45",
    "part_limit": "232100",
    "line_amount": "$433213934.00",
    "part_completed": "2800",
    "part_remaining": "0",
    "remaining": "0.00",
  },
  {
    id: "sdjks31mkk",
    status: "CLOSE",
    "po_num": "490032832189",
    "sort_num": "102407",
    "part_num": ["15645243-97-B", "15645243-97-C"],
    "start_date": "10/26/21",
    "line_num": "40",
    "po_date": "12/26/21",
    "po_stop_date": "01/26/22",
    "unit_price": "$3.45",
    "part_limit": "98300",
    "line_amount": "$43932134.00",
    "part_completed": "2800",
    "part_remaining": "0",
    "remaining": "0.00",
  },
]
```

> /api/getPoDetail
- method: POST
- request:
```
# 上限30天
{
  start_date: "xxx",
  end_date: "xxx",
}
```
- response:
```
# 每个part_num必须包含6条数据【看下面的items字段】
[
  {
    t_sort_num: "101143",
    part_num: "15645243-97-B",
    start_date: "09-01",
    location: "Livermore",
    items: "OK",
    "09/05": 0,
    "09/06": 0,
    "09/07": 0,
    "09/08": 0,
    "09/09": 0,
    "09/10": 0,
    "09/11": 0,
    "09/12": 0,
    "09/13": 0,
    total: 0,
  },
  {
    t_sort_num: "101143",
    part_num: "15645243-97-B",
    start_date: "09-01",
    location: "Livermore",
    items: "NOK",
    "09/05": 0,
    "09/06": 0,
    "09/07": 0,
    "09/08": 0,
    "09/09": 0,
    "09/10": 0,
    "09/11": 0,
    "09/12": 0,
    "09/13": 0,
    total: 0,
  },
  {
    t_sort_num: "101143",
    part_num: "15645243-97-B",
    start_date: "09-01",
    location: "Livermore",
    items: "REWORK",
    "09/05": 0,
    "09/06": 0,
    "09/07": 0,
    "09/08": 0,
    "09/09": 0,
    "09/10": 0,
    "09/11": 0,
    "09/12": 0,
    "09/13": 0,
    total: 0,
  },
  {
    t_sort_num: "101143",
    part_num: "15645243-97-B",
    start_date: "09-01",
    location: "Livermore",
    items: "HOLD",
    "09/05": 0,
    "09/06": 0,
    "09/07": 0,
    "09/08": 0,
    "09/09": 0,
    "09/10": 0,
    "09/11": 0,
    "09/12": 0,
    "09/13": 0,
    total: 0,
  },
  {
    t_sort_num: "101143",
    part_num: "15645243-97-B",
    start_date: "09-01",
    location: "Livermore",
    items: "Fall Out Rate",
    "09/05": 0,
    "09/06": 0,
    "09/07": 0,
    "09/08": 0,
    "09/09": 0,
    "09/10": 0,
    "09/11": 0,
    "09/12": 0,
    "09/13": 0,
    total: 0,
  },
  {
    t_sort_num: "101143",
    part_num: "15645243-97-B",
    start_date: "09-01",
    location: "Livermore",
    items: "Total Inspected",
    "09/05": 0,
    "09/06": 0,
    "09/07": 0,
    "09/08": 0,
    "09/09": 0,
    "09/10": 0,
    "09/11": 0,
    "09/12": 0,
    "09/13": 0,
    total: 0,
  }
      ]
```

> /api/exportReport
- method: POST
- request: 
```
{
  start_date: "xxx",
  end_date: "xxx"
}
```