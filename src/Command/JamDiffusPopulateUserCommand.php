<?php

namespace App\Command;

use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;


#[AsCommand(
    name: 'jam_diffus:populate_user',
    description: 'Populate user from cli interface',
)]
class JamDiffusPopulateUserCommand extends Command
{
    private array $users = [
        'Jérémy', 
        'Sophie', 
        'Geoffroy', 
        'Christophe', 
        'Christine'
    ];

    public function __construct(private EntityManagerInterface $entityManager)
    {
        parent::__construct();
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);

        foreach ($this->users as $name)
        {
            $user = new User();

            $user->setName($name);
            $age = rand(20, 100);
            $user->setAge($age);

            $this->entityManager->persist($user);

            $this->entityManager->flush();

            $io->note("User " . $name . " has been inserted with age " . $age);
        }    

        $io->success('Populate users had been succefully executed.');

        return Command::SUCCESS;
    }
}
