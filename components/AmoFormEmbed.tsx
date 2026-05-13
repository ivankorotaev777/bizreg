"use client";

import { useEffect, useRef } from "react";

const INIT_SCRIPT =
  '!function(a,m,o,c,r,m){a[o+c]=a[o+c]||{setMeta:function(p){this.params=(this.params||[]).concat([p])}},a[o+r]=a[o+r]||function(f){a[o+r].f=(a[o+r].f||[]).concat([f])},a[o+r]({id:"1709718",hash:"20293788a180fcf9d29b726dcd055be9",locale:"ru"}),a[o+m]=a[o+m]||function(f,k){a[o+m].f=(a[o+m].f||[]).concat([[f,k]])}}(window,0,"amo_forms_","params","load","loaded");';

const AMO_SCRIPT_SRC =
  "https://forms.amocrm.ru/forms/assets/js/amoforms.js?1778664682";

type AmoFormEmbedProps = {
  className?: string;
};

/**
 * AmoCRM expects its two script tags in the DOM next to where the form should appear.
 * next/script with afterInteractive hoists scripts away from the React subtree, so the
 * styled wrapper stayed empty. We inject both scripts inside this container instead.
 */
export function AmoFormEmbed({ className }: AmoFormEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    if (root.querySelector('script[data-bizreg-amo="1"]')) return;

    const init = document.createElement("script");
    init.type = "text/javascript";
    init.setAttribute("data-bizreg-amo", "1");
    init.textContent = INIT_SCRIPT;

    const loader = document.createElement("script");
    loader.id = "amoforms_script_1709718";
    loader.async = true;
    loader.charset = "utf-8";
    loader.setAttribute("data-bizreg-amo", "1");
    loader.src = AMO_SCRIPT_SRC;

    root.appendChild(init);
    root.appendChild(loader);

    return () => {
      root.querySelectorAll('script[data-bizreg-amo="1"]').forEach((el) => el.remove());
    };
  }, []);

  return <div ref={containerRef} className={className} />;
}
