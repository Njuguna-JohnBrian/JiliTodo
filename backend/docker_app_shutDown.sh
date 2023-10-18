echo "================================== shutting down JiliTodo Database ==================";
docker compose -f docker-compose.db.yml down || return;
echo "================================== done shutting down JiliTodo Database ==================";

echo "================================== shutting down JiliTodo api ==================";
docker compose -f docker-compose.api.yml down  || return;
echo "================================== done shutting down JiliTodo api ==================";
