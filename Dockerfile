# build front-end
# 前端构建阶段
FROM node:lts-alpine AS frontend
# 设置 NODE_OPTIONS 环境变量限制内存使用
ENV NODE_OPTIONS="--max-old-space-size=512"

# 安装全局的 pnpm
RUN npm install pnpm -g

# 设置工作目录为 /app
WORKDIR /app

# 复制 package.json 和 pnpm-lock.yaml 到 /app
COPY ./package.json ./pnpm-lock.yaml /app/

# 使用 pnpm 安装依赖
RUN pnpm install --frozen-lockfile

# 复制其他文件到 /app
COPY . /app

# 运行前端构建命令
RUN pnpm run build

# 后端构建阶段
FROM node:lts-alpine AS backend

# 安装全局的 pnpm
RUN npm install pnpm -g

# 设置工作目录为 /app
WORKDIR /app

# 复制 package.json 和 pnpm-lock.yaml 到 /app
COPY ./service/package.json ./service/pnpm-lock.yaml /app/

# 使用 pnpm 安装依赖
RUN pnpm install --frozen-lockfile

# 复制 service 目录到 /app
COPY ./service /app

# 运行后端构建命令
RUN pnpm build

# 服务阶段
FROM node:lts-alpine

# 安装全局的 pnpm
RUN npm install pnpm -g

# 设置工作目录为 /app
WORKDIR /app

# 复制 package.json 和 pnpm-lock.yaml 到 /app
COPY ./service/package.json ./service/pnpm-lock.yaml /app/

# 使用 pnpm 安装生产环境依赖，并清除缓存
RUN pnpm install --production && \
    rm -rf /root/.npm /root/.pnpm-store /usr/local/share/.cache /tmp/*

# 复制 service 目录到 /app
COPY ./service /app

# 从前端构建阶段复制 /app/dist 到 /app/public
COPY --from=frontend /app/dist /app/public

# 从后端构建阶段复制 /app/build 到 /app/build
COPY --from=backend /app/build /app/build

# 暴露端口号 3002
EXPOSE 3002

# 运行命令 pnpm run prod
CMD ["pnpm", "run", "prod"]
