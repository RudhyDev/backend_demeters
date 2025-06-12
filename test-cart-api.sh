#!/bin/bash

# Variáveis
API_URL="http://localhost:3000"
USER_ID="1" # Substitua pelo ID de um usuário válido no seu banco de dados

echo "Testando API do Carrinho"
echo "======================="

# 1. Criar um novo carrinho
echo "1. Criando um novo carrinho para o usuário $USER_ID"
CREATE_CART_RESPONSE=$(curl -s -X POST "$API_URL/carts" \
  -H "Content-Type: application/json" \
  -d "{\"userId\": \"$USER_ID\"}")
echo "Resposta: $CREATE_CART_RESPONSE"
CART_ID=$(echo $CREATE_CART_RESPONSE | grep -o '"id":"[^"]*' | sed 's/"id":"//')
echo "ID do carrinho criado: $CART_ID"
echo ""

# 2. Buscar o carrinho pelo ID
echo "2. Buscando o carrinho pelo ID: $CART_ID"
curl -s -X GET "$API_URL/carts/$CART_ID"
echo ""
echo ""

# 3. Adicionar um item ao carrinho
echo "3. Adicionando um produto ao carrinho"
PRODUCT_ID="1" # Substitua pelo ID de um produto válido no seu banco de dados
curl -s -X POST "$API_URL/carts/$CART_ID/items" \
  -H "Content-Type: application/json" \
  -d "{\"productId\": \"$PRODUCT_ID\", \"quantity\": 2}"
echo ""
echo ""

# 4. Buscar o carrinho novamente para ver o item adicionado
echo "4. Buscando o carrinho atualizado"
curl -s -X GET "$API_URL/carts/$CART_ID"
echo ""
echo ""

# 5. Atualizar a quantidade do item no carrinho
echo "5. Atualizando a quantidade do produto no carrinho"
curl -s -X PUT "$API_URL/carts/$CART_ID/items" \
  -H "Content-Type: application/json" \
  -d "{\"productId\": \"$PRODUCT_ID\", \"quantity\": 5}"
echo ""
echo ""

# 6. Buscar o carrinho novamente para ver a quantidade atualizada
echo "6. Buscando o carrinho com a quantidade atualizada"
curl -s -X GET "$API_URL/carts/$CART_ID"
echo ""
echo ""

# 7. Remover o item do carrinho
echo "7. Removendo o produto do carrinho"
curl -s -X DELETE "$API_URL/carts/$CART_ID/items/$PRODUCT_ID"
echo ""

# 8. Buscar o carrinho novamente para confirmar que o item foi removido
echo "8. Buscando o carrinho após remover o item"
curl -s -X GET "$API_URL/carts/$CART_ID"
echo ""
echo ""

# 9. Buscar o carrinho pelo ID do usuário
echo "9. Buscando o carrinho pelo ID do usuário: $USER_ID"
curl -s -X GET "$API_URL/carts/user/$USER_ID"
echo ""
echo ""

# 10. Limpar o carrinho
echo "10. Limpando o carrinho"
curl -s -X DELETE "$API_URL/carts/$CART_ID"
echo ""

echo "Testes concluídos!"
