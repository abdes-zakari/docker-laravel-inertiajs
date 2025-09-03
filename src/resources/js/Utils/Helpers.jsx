export const formatPrice = (p) =>
    typeof p === "number"
        ? new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(p)
        : p ?? "—";
