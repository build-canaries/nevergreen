# GitLab

For testing GitLab locally you can use Docker with:

```
sudo docker run --detach \
        --hostname gitlab.example.com \
        --publish 443:443 --publish 80:80 \
        --name gitlab \
        --restart always \
        gitlab/gitlab-ce:latest
```