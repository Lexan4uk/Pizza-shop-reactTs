const objectNormalizer = (item, path = "") => {
    if (item) {
        if ((path === "product" || path === "singleProduct") && item.image_links && item.image_links.length === 0)
            item.image_links.push('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOwRConBYl2t6L8QMOAQqa5FDmPB_bg7EnGA&s');
        if (path === "action" && item.cover && item.cover === "")
            item.cover = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOwRConBYl2t6L8QMOAQqa5FDmPB_bg7EnGA&s';
        if (path === "singleProduct" && item.parent_group.name.includes("Пицца")) {
            item.isPizza = true
            if (item.name.includes("40см"))
                item.size = 40
            if (item.name.includes("33см"))
                item.size = 33
            if (item.name.includes("25см"))
                item.size = 25
            if (item.name.includes("ТТ"))
                item.thickness = "thin"
            else
                item.thickness = "traditional"
        }
        if (path === "action" || path === "singleProduct")
            return item //можно убрать. Убирает хреф у акции
        item.href = `${path}/${item.id}`
    }


    return item;
}
export default objectNormalizer