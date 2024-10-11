export default class ValidaCpf {
    constructor(cpfEnviado){
        Object.defineProperty(this, "cpfLimpo",{
            writable: false,
            enumarable: false,
            configurable: false,
            value: cpfEnviado.replace(/\D+/g, '')
        });
    };

    éSequencia(){
        return this.cpfLimpo.charAt(0).repeat(11) === this.cpfLimpo;
    }

    geraNovoCpf() {
        const cpfSemDigitos = this.cpfLimpo.slice(0, -2);
        const digito1 = ValidaCpf.geraDigitos(cpfSemDigitos);
        const digito2 = ValidaCpf .geraDigitos(cpfSemDigitos + digito1);

        this.novoCpf = cpfSemDigitos + digito1 + digito2;
    }

    static geraDigitos(cpfSemDigitos) {
        let total = 0;
        let reverso = cpfSemDigitos.length + 1;

        for (let stringNumericos of cpfSemDigitos) {
            total += reverso * Number(stringNumericos);
            reverso --;
        }

        const digito = 11 - (total % 11);
        return digito <= 9 ? String(digito) : '0';

    }
    
    valida() {
        if(!this.cpfLimpo) return false;
        if(typeof this.cpfLimpo !== "string") return false;
        if(this.cpfLimpo.length !== 11) return false;
        if(this.éSequencia()) return false;
        this.geraNovoCpf();

        return this.cpfLimpo === this.novoCpf
    }
    
}
