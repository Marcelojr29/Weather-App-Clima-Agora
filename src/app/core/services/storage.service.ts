import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  /**
   * Salva um valor no LocalStorage
   * @param key Chave de armazenamento
   * @param value Valor a ser salvo (será convertido para JSON)
   */
  save<T>(key: string, value: T): void {
    try {
      const serialized = JSON.stringify(value);
      localStorage.setItem(key, serialized);
    } catch (error) {
      console.error('Erro ao salvar no LocalStorage:', error);
    }
  }

  /**
   * Recupera um valor do LocalStorage
   * @param key Chave de armazenamento
   * @returns Valor deserializado ou null se não encontrado
   */
  get<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);
      if (!item) return null;
      return JSON.parse(item) as T;
    } catch (error) {
      console.error('Erro ao ler do LocalStorage:', error);
      return null;
    }
  }

  /**
   * Remove um item do LocalStorage
   * @param key Chave de armazenamento
   */
  remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Erro ao remover do LocalStorage:', error);
    }
  }

  /**
   * Limpa todos os itens do LocalStorage
   */
  clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Erro ao limpar LocalStorage:', error);
    }
  }
}
