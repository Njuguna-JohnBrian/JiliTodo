echo "================================== starting JiliTodo Database ==================";
docker compose -f docker-compose.db.yml up -d  || return;
echo "================================== done starting JiliTodo Database ==================";

