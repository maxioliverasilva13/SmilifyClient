

export const formatAranceles = (aranceles: any[]) => {
    return aranceles?.filter((arancel: any) => arancel?.type !== "ArancelLaboratorio")
}

export const formatArancelesLab = (aranceles: any[]) => {
    return aranceles?.filter((arancel: any) => arancel?.type === "ArancelLaboratorio")
}