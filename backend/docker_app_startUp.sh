echo "================================== starting JiliTodo Database ==================";
docker compose -f docker-compose.db.yml up -d  || return;
echo "================================== done starting JiliTodo Database ==================";

echo "================================== building JiliTodo api ==================";
docker compose -f docker-compose.api.yml build  || return;
echo "================================== done building JiliTodo api ==================";

echo "================================== starting JiliTodo api ==================";
docker compose -f docker-compose.api.yml up  || return;
echo "================================== done starting JiliTodo api ==================";
