export const steps = [{}, click, click, click];

function click(container: Element) {
  container.querySelector("button")!.click();
}

export const skip_dom = true;
export const skip_csr = true;
export const skip_ssr = true;