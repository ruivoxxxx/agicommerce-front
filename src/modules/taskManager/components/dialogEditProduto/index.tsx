import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { Field, FieldGroup } from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { useState } from "react";
import { api } from "../../services/api";
import type { CardProdutoProp } from "../cardProduto";

type DiaLogProp = {
  isOpen: boolean;
  onCLose: () => void;
  getProduct: () => void;
  selectedProduct: CardProdutoProp | null;
};

export function DialogEditProduto({
  isOpen,
  onCLose,
  getProduct,
  selectedProduct,
}: DiaLogProp) {
  const [nome, setNome] = useState(selectedProduct?.nome);
  const [descricao, setDescricao] = useState(selectedProduct?.descricao);
  const [preco, setPreco] = useState(selectedProduct?.preco);
  const [estoque, setEstoque] = useState(selectedProduct?.estoque);
  const [categoria, setCategoria] = useState(selectedProduct?.categoria);
  const [imagem, setImagem] = useState("");

  async function handleSubmit() {
    try {
      await api.put(`api/produtos/${selectedProduct?.id}`, {
        nome,
        descricao,
        preco: Number(preco),
        estoque,
        categoria,
        imagemUrl: imagem,
      });

      onCLose();
      getProduct();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onCLose}>
      <div>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Editar Produto</DialogTitle>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="name-1">Nome do Produto</Label>
              <Input
                placeholder="Informe o nome do produto"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </Field>
            <Field>
              <Label htmlFor="name-1">Descrição</Label>
              <Input
                placeholder="Informe a descrição do produto"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              />
            </Field>
            <Field>
              <Label htmlFor="username-1">Preço</Label>
              <Input
                placeholder="Informe o preço do produto"
                value={preco}
                type="number"
                onChange={(e) => setPreco(Number(e.target.value))}
              />
            </Field>
            <Field>
              <Label htmlFor="username-1">Estoque</Label>
              <Input
                type="number"
                placeholder="Informe a quantidade no estoque"
                value={estoque}
                onChange={(e) => setEstoque(Number(e.target.value))}
              />
            </Field>
            <Field>
              <Label htmlFor="username-1">Categoria</Label>
              <Select value={categoria} onValueChange={(e) => setCategoria(e)}>
                <SelectTrigger className="w-full max-w-48">
                  <SelectValue placeholder="Selecione a categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pc">Computador</SelectItem>
                  <SelectItem value="console">Consoles</SelectItem>
                  <SelectItem value="monitor">Monitores</SelectItem>
                  <SelectItem value="celular">Celulares</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <Label htmlFor="username-1">Selecione a imagem</Label>
              <Input
                id="imagem"
                type="text"
                placeholder="Informe a URL da imagem"
                value={imagem}
                onChange={(e) => setImagem(e.target.value)}
              />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" onClick={onCLose}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" onClick={handleSubmit}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </div>
    </Dialog>
  );
}
