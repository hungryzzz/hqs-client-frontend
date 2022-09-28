/*
 * @Created on: 2022-09-16 23:50:04
 * @@LastEditTime: 2022-09-28 11:51:43
 * @@Author: ring
 * 
 * @@Desc: 
 * 
 */
// [header name, width]
export const PoListHeader = [
  ["STATUS", "status", 120, "left"],
  ["PO#", "po_num", 130, "left"],
  ["SORT#", "sort_num", 110, "left"],
  ["PART#", "part_num", 135, ""],
  // ["Start Date", "start_date", 100, ""],
  ["LINE#", "line", 70, ""],
  ["PO Date", "po_date", 120, ""],
  // ["PO Stop Date", "po_stop_date", 125, ""],
  ["Unit Price", "unit_price", 100, ""],
  ["Part Limit", "part_limit", 100, ""],
  ["Line Amount", "line_amount", 130, ""],
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
  // "start_date",
];

export const DetailTableHeader = [
  // ["T-SORT#", "t_sort_num", 120, "left"],
  ["PART#", "part_num", 140, "left"],
  ["Start Date", "start_date", 120, "left"],
  ["Location", "location", 110, "left"],
  ["Items", "items", 135, "left"],
  ["Date", "date"],
  ["Total", "total", 110, "right"],
];

export const DetailSpanHeader = [
  "t_sort_num",
  "part_num",
  "start_date",
  "location",
];