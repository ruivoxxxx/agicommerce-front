import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { Pencil, CheckSquare, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export type CardProdutoProp = {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  estoque: number;
  categoria: string;
  imagemUrl: string;
  ativo: boolean;
  dataCadastro: Date;
  handleExcluir: (id: string) => void;
  openEdit: () => void;
  selectProduct: () => void;
};

export function CardProduto({
  id,
  nome,
  descricao,
  preco,
  estoque,
  categoria,
  imagemUrl,
  ativo,
  dataCadastro,
  handleExcluir,
  openEdit,
  selectProduct,
}: CardProdutoProp) {
  const navigate = useNavigate();

  return (
    <Card
      className="w-full overflow-hidden rounded-2xl shadow-lg border-0 hover:cursor-pointer"
      onClick={() => navigate(`/produto/${id}`)}
    >
      <div
        className="h-40 w-full -mt-6"
        style={{
          background:
            "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a78bfa 100%)",
        }}
      />
      <CardContent className="-my-6 p-4 space-y-3">
        <h3 className="font-semibold text-gray-800 text-base">{nome}</h3>

        <p className="text-xl font-bold text-green-500">{preco}</p>

        <div className="flex items-center gap-2">
          <Badge
            variant="secondary"
            className="bg-gray-100 text-gray-600 hover:bg-gray-100 font-normal rounded-full px-3"
          >
            {categoria}
          </Badge>
          <Badge
            variant="outline"
            className="border-green-500 text-green-600 bg-green-50 hover:bg-green-50 font-normal rounded-full px-3 flex items-center gap-1"
          >
            <CheckSquare className="w-3.5 h-3.5" />
            {estoque} unidades
          </Badge>
        </div>

        <div className="flex gap-2 pt-1">
          <Button
            onClick={() => {
              openEdit();
              selectProduct();
            }}
            className="flex-1 text-white rounded-lg h-9 text-sm font-medium"
          >
            <Pencil className="w-4 h-4 mr-1.5" />
            Editar
          </Button>
          <Button
            variant={"destructive"}
            onClick={() => handleExcluir(id)}
            className="flex-1 text-white rounded-lg h-9 text-sm font-medium"
          >
            <Trash2 className="w-4 h-4 mr-1.5" />
            Excluir
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
