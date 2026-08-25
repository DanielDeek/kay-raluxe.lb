import { BagItem } from "@/types";
import { WHATSAPP_NUMBER, STORE_NAME } from "./config";
import { formatPrice } from "./utils";

interface OrderDetails {
  items: BagItem[];
  customerName?: string;
  address?: string;
  deliveryArea?: string;
  note?: string;
}

const missing = "[To be confirmed]";

export function buildOrderMessage({ items, customerName, address, deliveryArea, note }: OrderDetails) {
  const lines = [`Hello ${STORE_NAME}, I would like to place an order:`, ""];
  items.forEach((item, index) => {
    lines.push(`${index + 1}. ${item.name}`);
    lines.push(`   Size: ${item.size || missing}`);
    lines.push(`   Colour: ${item.color || missing}`);
    lines.push(`   Quantity: ${item.quantity}`);
    lines.push(`   Unit price: ${formatPrice(item.price)}`);
    lines.push(`   Line total: ${formatPrice(item.price * item.quantity)}`);
    lines.push("");
  });
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  lines.push(`Total: ${formatPrice(total)}`);
  lines.push("");
  lines.push(`Name: ${customerName || missing}`);
  lines.push(`Address: ${address || missing}`);
  lines.push(`Delivery area: ${deliveryArea || missing}`);
  lines.push(`Delivery notes: ${note || missing}`);
  return lines.join("\n");
}

export function buildWhatsAppLink(message: string, number: string = WHATSAPP_NUMBER) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function buildSingleProductMessage(params: { name: string; size: string; color: string; quantity: number; price: number }) {
  return buildOrderMessage({ items: [{ productId: "", slug: "", image: "", ...params }] });
}
