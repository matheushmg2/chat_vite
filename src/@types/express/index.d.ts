/**
 * Poderei pegar em qualquer parte da aplicação a variavel referente/referencial 
 * Lembrando que tenho que inserir qual a interface para pegar a informação
 */
declare namespace Express {
  export interface Request {
    userId: string;
  }
}