"use client";

import { memo, useLayoutEffect, useRef } from "react";

const FORM_ID = "1709718";
const SCRIPT_ID = `amoforms_script_${FORM_ID}`;
const IFRAME_ID = `amoforms_iframe_${FORM_ID}`;

const INIT_SCRIPT =
  '!function(a,m,o,c,r,m){a[o+c]=a[o+c]||{setMeta:function(p){this.params=(this.params||[]).concat([p])}},a[o+r]=a[o+r]||function(f){a[o+r].f=(a[o+r].f||[]).concat([f])},a[o+r]({id:"1709718",hash:"20293788a180fcf9d29b726dcd055be9",locale:"ru"}),a[o+m]=a[o+m]||function(f,k){a[o+m].f=(a[o+m].f||[]).concat([[f,k]])}}(window,0,"amo_forms_","params","load","loaded");';

const AMO_SCRIPT_SRC =
  "https://forms.amocrm.ru/forms/assets/js/amoforms.js?1778664682";

type AmoFormEmbedProps = {
  className?: string;
};

function clearAmoHost(root: HTMLElement) {
  while (root.firstChild) {
    root.removeChild(root.firstChild);
  }
}

/** Remove stale Amo nodes left after SPA navigation or interrupted loads (duplicate ids break amoforms.js). */
function removeStaleAmoDom() {
  document.getElementById(SCRIPT_ID)?.remove();
  document.getElementById(IFRAME_ID)?.remove();
  document.getElementById("amoforms_action_btn")?.remove();
  document.getElementById(`amoforms_overlay_${FORM_ID}`)?.remove();
}

/**
 * AmoCRM expects its two script tags in the DOM next to where the form should appear.
 * Non-React children (iframe) must not be reconciled away: memo comparator always returns true
 * so this component never re-renders after mount unless `key` changes.
 */
function AmoFormEmbedInner({ className }: AmoFormEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    removeStaleAmoDom();
    clearAmoHost(root);

    const init = document.createElement("script");
    init.type = "text/javascript";
    init.setAttribute("data-bizreg-amo", "1");
    init.textContent = INIT_SCRIPT;

    const loader = document.createElement("script");
    loader.id = SCRIPT_ID;
    loader.async = true;
    loader.charset = "utf-8";
    loader.setAttribute("data-bizreg-amo", "1");
    loader.src = AMO_SCRIPT_SRC;

    root.appendChild(init);
    root.appendChild(loader);

    return () => {
      clearAmoHost(root);
      document.getElementById(`amoforms_overlay_${FORM_ID}`)?.remove();
    };
  }, []);

  return <div ref={containerRef} className={className} />;
}

export const AmoFormEmbed = memo(AmoFormEmbedInner, () => true);
