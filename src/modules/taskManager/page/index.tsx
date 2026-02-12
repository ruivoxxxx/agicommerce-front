import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import {
  CardProduto,
  type CardProdutoProp,
} from "@/modules/taskManager/components/cardProduto";
import { useEffect, useState } from "react";
import { DialogCreateProduto } from "@/modules/taskManager/components/dialogCreateProduto";
import { api } from "../services/api";
import { DialogEditProduto } from "../components/dialogEditProduto";
import { Field } from "@/shared/components/ui/field";
import { Label } from "@/shared/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Search, X } from "lucide-react";

function TaskManager() {
  const [openDialog, setOpenDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [productSelected, setProductSelected] =
    useState<CardProdutoProp | null>(null);
  const [search, setSearch] = useState("");
  const [categorySelected, setCategorySelected] = useState("");
  const [orderSelected, setOrderSelected] = useState("recentes");
  const [products, setProducts] = useState<CardProdutoProp[]>([]);

  async function getProducts() {
    try {
      const response = await api.get("api/produtos", {
        params: {
          categoria: categorySelected === "all" ? "" : categorySelected,
          ordenar: orderSelected,
          nome: search,
        },
      });
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteProduct(id: string) {
    try {
      const response = await api.delete(`api/produtos/${id}`);
      if (response.status === 200) {
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== id),
        );
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getProducts();
  }, [categorySelected, orderSelected, search]);

  return (
    <div className="w-full h-screen p-12 space-y-3 ">
      <header>
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-2xl">Catálogo de Produtos</h1>

          <Button onClick={() => setOpenDialog(true)}>+ Novo Produto</Button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto space-y-10">
        <div className="flex gap-3 items-end">
          <div className="w-full relative">
            <Input
              className="w-full"
              placeholder="Buscar produtos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Search className="absolute top-1/2 -translate-y-1/2 right-3 h-4 w-4 text-gray-500" />
          </div>

          <Field>
            <Label htmlFor="username-1">Filtre por Categoria</Label>
            <Select
              value={categorySelected}
              onValueChange={(e) => setCategorySelected(e)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione a categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as Categorias</SelectItem>
                <SelectItem value="pc">Computador</SelectItem>
                <SelectItem value="console">Consoles</SelectItem>
                <SelectItem value="monitor">Monitores</SelectItem>
                <SelectItem value="celular">Celulares</SelectItem>
              </SelectContent>
            </Select>
          </Field>

          <Field>
            <Label htmlFor="username-1">Ordenação por</Label>
            <Select
              value={orderSelected}
              onValueChange={(e) => setOrderSelected(e)}
            >
              <SelectTrigger>
                <SelectValue
                  placeholder="Selecione a categoria"
                  defaultValue="recentes"
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recentes">Recentes</SelectItem>
                <SelectItem value="antigos">Antigos</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-12">
          {products.map((product, index) => (
            <CardProduto
              nome={product.nome}
              categoria={product.categoria}
              preco={product.preco}
              estoque={product.estoque}
              ativo={product.ativo}
              dataCadastro={product.dataCadastro}
              descricao={product.descricao}
              imagemUrl={product.imagemUrl}
              id={product.id}
              key={index}
              handleExcluir={deleteProduct}
              openEdit={() => setOpenEditDialog(true)}
              selectProduct={() => setProductSelected(product)}
            />
          ))}
          {products.length === 0 && (
            <div className="w-full flex flex-col justify-center">
              <X className="w-20 h-20 text-red-700" />
              <span>Nenhum produto encontrado...</span>
            </div>
          )}
        </div>
      </main>
      {openDialog && (
        <DialogCreateProduto
          isOpen={openDialog}
          onCLose={() => setOpenDialog(false)}
          getProduct={getProducts}
        />
      )}
      {openEditDialog && (
        <DialogEditProduto
          isOpen={openEditDialog}
          onCLose={() => setOpenEditDialog(false)}
          getProduct={getProducts}
          selectedProduct={productSelected}
        />
      )}
    </div>
  );
}

export { TaskManager };
