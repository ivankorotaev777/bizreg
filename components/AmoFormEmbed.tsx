"use client";

import { memo, useLayoutEffect, useRef } from "react";

/** All form ids used on the site — clear stale DOM on SPA navigation (Amo uses global ids). */
const AMO_FORM_IDS = ["1709718", "1709794"] as const;

const DEFAULT_FORM_ID = "1709718";
const DEFAULT_FORM_HASH = "20293788a180fcf9d29b726dcd055be9";
const DEFAULT_SCRIPT_VERSION = "1778664682";

type AmoFormEmbedProps = {
  className?: string;
  /** Amo web form id from embed code */
  formId?: string;
  /** Amo form hash from embed code */
  formHash?: string;
  /** Query string after `amoforms.js?` (cache buster from Amo snippet) */
  amoScriptVersion?: string;
};

function buildInitScript(formId: string, formHash: string) {
  return `!function(a,m,o,c,r,m){a[o+c]=a[o+c]||{setMeta:function(p){this.params=(this.params||[]).concat([p])}},a[o+r]=a[o+r]||function(f){a[o+r].f=(a[o+r].f||[]).concat([f])},a[o+r]({id:"${formId}",hash:"${formHash}",locale:"ru"}),a[o+m]=a[o+m]||function(f,k){a[o+m].f=(a[o+m].f||[]).concat([[f,k]])}}(window,0,"amo_forms_","params","load","loaded");`;
}

function clearAmoHost(root: HTMLElement) {
  while (root.firstChild) {
    root.removeChild(root.firstChild);
  }
}

function removeStaleAmoDomForKnownForms() {
  for (const id of AMO_FORM_IDS) {
    document.getElementById(`amoforms_script_${id}`)?.remove();
    document.getElementById(`amoforms_iframe_${id}`)?.remove();
    document.getElementById(`amoforms_overlay_${id}`)?.remove();
  }
  document.getElementById("amoforms_action_btn")?.remove();
}

/**
 * AmoCRM expects its two script tags in the DOM next to where the form should appear.
 * Non-React children (iframe) must not be reconciled away: memo skips re-renders when embed config is unchanged.
 */
function AmoFormEmbedInner({
  className,
  formId = DEFAULT_FORM_ID,
  formHash = DEFAULT_FORM_HASH,
  amoScriptVersion = DEFAULT_SCRIPT_VERSION,
}: AmoFormEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    removeStaleAmoDomForKnownForms();
    clearAmoHost(root);

    const init = document.createElement("script");
    init.type = "text/javascript";
    init.setAttribute("data-bizreg-amo", "1");
    init.textContent = buildInitScript(formId, formHash);

    const loader = document.createElement("script");
    loader.id = `amoforms_script_${formId}`;
    loader.async = true;
    loader.charset = "utf-8";
    loader.setAttribute("data-bizreg-amo", "1");
    loader.src = `https://forms.amocrm.ru/forms/assets/js/amoforms.js?${amoScriptVersion}`;

    root.appendChild(init);
    root.appendChild(loader);

    return () => {
      clearAmoHost(root);
      document.getElementById(`amoforms_overlay_${formId}`)?.remove();
    };
  }, [formId, formHash, amoScriptVersion]);

  return <div ref={containerRef} className={className} />;
}

function propsEqual(a: AmoFormEmbedProps, b: AmoFormEmbedProps) {
  return (
    a.formId === b.formId &&
    a.formHash === b.formHash &&
    a.amoScriptVersion === b.amoScriptVersion &&
    a.className === b.className
  );
}

export const AmoFormEmbed = memo(AmoFormEmbedInner, propsEqual);
