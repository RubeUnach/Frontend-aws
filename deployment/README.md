# Despliegue Frontend AWS

## Arquitectura

El navegador accede únicamente al Frontend mediante HTTPS.

Las solicitudes `/api/*` son enviadas por Nginx al Backend mediante
la dirección IP privada del EC2 Backend y VPC Peering.

```text
Internet
   |
   v
AWS WAF
   |
   v
Nginx Frontend
   |
   +---- React
   |
   +---- /api/*
           |
           v
       VPC Peering
           |
           v
       Node Backend
