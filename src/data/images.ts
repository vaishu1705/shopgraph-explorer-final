import laptop from "@/assets/products/laptop.jpg";
import smartphone from "@/assets/products/smartphone.jpg";
import headphones from "@/assets/products/headphones.jpg";
import mouse from "@/assets/products/mouse.jpg";
import keyboard from "@/assets/products/keyboard.jpg";
import monitor from "@/assets/products/monitor.jpg";
import laptopStand from "@/assets/products/laptop-stand.jpg";
import usbHub from "@/assets/products/usb-hub.jpg";
import smartwatch from "@/assets/products/smartwatch.jpg";
import tablet from "@/assets/products/tablet.jpg";
import charger from "@/assets/products/charger.jpg";
import earbuds from "@/assets/products/earbuds.jpg";

/** Image keys map 1:1 to product kinds so API data can send the same key later. */
export const productImages = {
  laptop,
  smartphone,
  headphones,
  mouse,
  keyboard,
  monitor,
  "laptop-stand": laptopStand,
  "usb-hub": usbHub,
  smartwatch,
  tablet,
  charger,
  earbuds,
} as const;

export type ImageKey = keyof typeof productImages;

export const FALLBACK_IMAGE = laptop;

export function imageFor(key: string): string {
  return productImages[key as ImageKey] ?? FALLBACK_IMAGE;
}
