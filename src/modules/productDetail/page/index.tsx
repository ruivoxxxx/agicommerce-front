import type { CardProdutoProp } from "@/modules/taskManager/components/cardProduto";
import { api } from "@/modules/taskManager/service/api";
import { Badge } from "@/shared/components/ui/badge";
import { cn } from "@/shared/lib/utils";
import { CheckSquare } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<CardProdutoProp | null>(null);
  const navigate = useNavigate();

  async function getProduct() {
    try {
      const response = await api.get(`api/produtos/${id}`);
      if (response) {
        setProduct(response.data);
        return;
      }
      navigate("/");
    } catch (error) {
      console.error(error);
      navigate("/");
    }
  }

  useEffect(() => {
    getProduct();
  }, []);

  if (!product) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div
        className="h-64 md:h-80 w-full"
        style={{
          background:
            "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a78bfa 100%)",
        }}
      />

      <div className="max-w-4xl mx-auto px-4 -mt-20 pb-10">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 space-y-6">
          <div className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">
              {product.nome}
            </h1>

            <p className="text-2xl font-bold text-green-600">
              R$ {product.preco}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Badge
              variant="secondary"
              className="bg-gray-100 text-gray-600 hover:bg-gray-100 font-semibold rounded-[12px] text-[12px] px-3 capitalize"
            >
              {product.categoria}
            </Badge>

            <Badge
              variant="outline"
              className={cn(
                "font-semibold rounded-[12px] text-[12px] px-3 flex items-center gap-1",
                product.estoque === 0
                  ? "border-destructive text-destructive bg-destructive hover:bg-destructive/80"
                  : product.estoque < 10
                    ? "border-warning text-warning bg-warning hover:bg-warning/80"
                    : "border-green-500 text-green-600 bg-green-50 hover:bg-green-50",
              )}
            >
              <CheckSquare className="w-3.5 h-3.5" />
              {product.estoque} unidades
            </Badge>
          </div>

          <div className="pt-4 border-t">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Descrição
            </h2>
            <p className="text-gray-700 leading-relaxed">{product.descricao}</p>
          </div>

          <div className="pt-4 border-t text-sm text-gray-500">
            Cadastrado em:{" "}
            {new Date(product.dataCadastro).toLocaleDateString("pt-BR")}
          </div>
        </div>
      </div>
    </div>
  );
}

export { ProductDetail };
