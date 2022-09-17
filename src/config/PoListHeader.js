/*
 * @Created on: 2022-09-16 23:50:04
 * @@LastEditTime: 2022-09-18 01:26:17
 * @@Author: ring
 * 
 * @@Desc: 
 * 
 */
// [header name, width]
export const PoListHeader = [
  ["STATUS", "status", 90, "left"],
  ["PO#", "po_num", 130, "left"],
  ["SORT#", "sort_num", 110, "left"],
  ["PART#", "part_num", 135, ""],
  ["Start Date", "start_date", 100, ""],
  ["LINE#", "line_num", 70, "", "line-header-style"],
  ["PO Date", "po_date", 95, "", "line-header-style"],
  ["PO Stop Date", "po_stop_date", 125, "", "line-header-style"],
  ["Unit Price", "unit_price", 100, "", "line-header-style"],
  ["Part Limit", "part_limit", 100, "", "line-header-style"],
  ["Line Amount", "line_amount", 140, "", "line-header-style"],
  ["Part Completed", "part_completed", 135, ""],
  ["Part Remaining", "part_remaining", 130, ""],
  ["Remaining %", "remaining", 120, "right"],
  ["Billing", "billing", 70, "right"],
];

export const SpanHeader = [
  "status",
  "po_num",
  "sort_num",
  "part_num",
  "start_date",
];