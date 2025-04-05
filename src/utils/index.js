const formatearDinero = (valor) => {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    })
    return formatter.format(valor);
}

const calcularTotal = (cantidad, plazo) => {
    let total;
    let interesBase;
    
    // Calcula el interés base según la cantidad
    if(cantidad < 5000) {
        interesBase = 1.5; // 50% de interés para montos pequeños
    } else if(cantidad < 10000) {
        interesBase = 1.3; // 30% de interés para montos medios
    } else if(cantidad < 15000) {
        interesBase = 1.2; // 20% de interés para montos altos
    } else {
        interesBase = 1.1; // 10% de interés para montos muy altos
    }
    
    // Ajusta el interés según el plazo
    let multiplicadorPlazo;
    switch(plazo) {
        case 3:
            multiplicadorPlazo = 1.0; // Sin ajuste para 3 meses
            break;
        case 6:
            multiplicadorPlazo = 1.1; // 10% más de interés para 6 meses
            break;
        case 12:
            multiplicadorPlazo = 1.2; // 20% más de interés para 12 meses
            break;
        case 24:
            multiplicadorPlazo = 1.3; // 30% más de interés para 24 meses
            break;
        default:
            multiplicadorPlazo = 1.0;
    }
    
    // Calcula el total con el interés base y el multiplicador del plazo
    total = cantidad * (interesBase * multiplicadorPlazo);
    
    return total;
}

export { formatearDinero, calcularTotal }