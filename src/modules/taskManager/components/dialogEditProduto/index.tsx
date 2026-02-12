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
import { useEffect, useState } from "react";
import { api } from "../../service/api";
import type { CardProdutoProp } from "../cardProduto";
import { cn } from "@/shared/lib/utils";

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
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState<number | string>("");
  const [estoque, setEstoque] = useState<number | string>("");
  const [categoria, setCategoria] = useState("");
  const [imagem, setImagem] = useState("");

  async function handleSubmit() {
    try {
      if (!nome.trim()) {
        return;
      }

      if (!preco || Number(preco) <= 0) {
        return;
      }

      if (!estoque || Number(estoque) <= 0) {
        return;
      }

      if (!categoria) {
        return;
      }

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

  useEffect(() => {
    if (selectedProduct) {
      setNome(selectedProduct.nome || "");
      setDescricao(selectedProduct.descricao || "");
      setPreco(selectedProduct.preco || "");
      setEstoque(selectedProduct.estoque || "");
      setCategoria(selectedProduct.categoria || "");
      setImagem(selectedProduct.imagemUrl || "");
    }
  }, [selectedProduct]);

  return (
    <Dialog open={isOpen} onOpenChange={onCLose}>
      <div>
        <DialogContent className="sm:max-w-sm rounded-[12px]">
          <DialogHeader>
            <DialogTitle>Editar Produto</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <Label htmlFor="name-1" className="text-[14px]">
                  Nome do Produto
                </Label>
                <Input
                  placeholder="Informe o nome do produto"
                  required
                  maxLength={100}
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className={cn(!nome && "border-red-500")}
                />
              </Field>
              <Field>
                <Label htmlFor="name-1" className="text-[14px]">
                  Descrição
                </Label>
                <Input
                  placeholder="Informe a descrição do produto"
                  value={descricao}
                  maxLength={100}
                  onChange={(e) => setDescricao(e.target.value)}
                />
              </Field>
              <Field>
                <Label htmlFor="username-1" className="text-[14px]">
                  Preço
                </Label>
                <Input
                  placeholder="Informe o preço do produto"
                  required
                  value={preco}
                  onChange={(e) => setPreco(Number(e.target.value))}
                  className={cn(!preco && "border-red-500")}
                />
              </Field>
              <Field>
                <Label htmlFor="username-1" className="text-[14px]">
                  Estoque
                </Label>
                <Input
                  type="number"
                  placeholder="Informe a quantidade no estoque"
                  required
                  minLength={0}
                  value={estoque}
                  onChange={(e) => setEstoque(Number(e.target.value))}
                  className={cn(!estoque && "border-red-500")}
                />
              </Field>
              <Field>
                <Label htmlFor="username-1" className="text-[14px]">
                  Categoria
                </Label>
                <Select
                  value={categoria}
                  onValueChange={(e) => setCategoria(e)}
                >
                  <SelectTrigger
                    className={cn("w-full", !categoria && "border-red-500")}
                  >
                    <SelectValue placeholder="Selecione a categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="computador">Computador</SelectItem>
                    <SelectItem value="console">Consoles</SelectItem>
                    <SelectItem value="monitor">Monitores</SelectItem>
                    <SelectItem value="celular">Celulares</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field>
                <Label htmlFor="username-1" className="text-[14px]">
                  Selecione a imagem
                </Label>
                <Input
                  id="imagem"
                  type="text"
                  placeholder="Informe a URL da imagem"
                  value={imagem}
                  onChange={(e) => setImagem(e.target.value)}
                />
              </Field>
            </FieldGroup>
          </form>
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
