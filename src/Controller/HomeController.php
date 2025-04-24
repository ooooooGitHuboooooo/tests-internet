<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;

final class HomeController extends AbstractController
{
    #[Route('/', name: 'app_home')]
    public function index(EntityManagerInterface $entityManager): Response
    {
        $users = $entityManager->getRepository(User::class)->findAll();

        return $this->render('home/index.html.twig', [
            'users' => $users,
        ]);
    }

    #[Route('/detail/{id}', name: 'app_detail')]
    public function detail(EntityManagerInterface $entityManager, int $id): Response
    {
        $user = $entityManager->getRepository(User::class)->find($id);

        return new Response($user->getAge());
    }

    #[Route('/delete/{id}', name: 'app_delete')]
    public function delete(EntityManagerInterface $entityManager, int $id): Response
    {
        $user = $entityManager->getRepository(User::class)->find($id);

        $entityManager->remove($user);
        $entityManager->flush();

        return new Response('success');
    }

    #[Route('/getList/{name?}', name: 'app_get_list')]
    public function getList(EntityManagerInterface $entityManager, ?string $name)
    {
        if ($name)
        {
            $users = $entityManager->getRepository(User::class)->createQueryBuilder('u')
                        ->andWhere("u.name like CONCAT('%', :name, '%')")
                        ->setParameter('name', $name)
                        ->getQuery()
                        ->getResult();
        }
        else
        {
            $users = $entityManager->getRepository(User::class)->findAll();
        }

        return $this->render('home/getList.html.twig', [
            'users' => $users,
        ]); 
    }
}
