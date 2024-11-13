'use client'
import React, { Suspense, useState } from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Github, Upload, Eye } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import TextAreaLimited from '@/components/TextAreaLimited';
import ProfileAvatar from '@/components/ProfileAvatar';

// Schema de validação
const portfolioSchema = z.object({
  name: z.string().min(2, 'Name is too short'),
  role: z.string().min(2, 'Role is too short'),
  about: z.string().min(50, 'Please write at least 50 characters about yourself'),
  email: z.string().email('Invalid email address'),
  skills: z.array(z.string()).min(1, 'Add at least one skill'),
  avatar: z.union([z.string(), z.instanceof(File)]).optional()
});


export default function Home() {
  const t = useTranslations('portfolio');
  const { toast } = useToast();
  const [isDeploying, setIsDeploying] = React.useState(false);
  const [previewOpen, setPreviewOpen] = React.useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(portfolioSchema),
    defaultValues: {
      name: '',
      role: '',
      about: '',
      email: '',
      skills: [],
      avatar: ''
    }
  });

  const formData = watch();

  const onSubmit = async (data) => {
    try {
      setIsDeploying(true);
      // Deployment logic here
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulated delay

      toast({
        title: "Success!",
        description: "Your portfolio has been deployed successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to deploy portfolio. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsDeploying(false);
    }
  };


  const handleImageUpload = (file: File | null, url: string | null) => {
    if (file) {
      setValue('avatar', file); // Armazena o arquivo para o envio
    } else {
      setValue('avatar', ''); // Limpa o campo se a imagem for removida
    }
  };


  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Avatar Upload */}
        <ProfileAvatar
          onImageChange={handleImageUpload}
        />

        {/* Personal Information */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">{t('personalInfo.name')}</Label>
            <Input
              id="name"
              {...register('name')}
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="role">{t('personalInfo.role')}</Label>
            <Input
              id="role"
              {...register('role')}
              className={errors.role ? 'border-red-500' : ''}
            />
            {errors.role && (
              <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="about">{t('personalInfo.about')}</Label>
            <TextAreaLimited
              id="about"
              {...register('about')}
              className={`h-32 ${errors.about ? 'border-red-500' : ''}`}
            />
            {errors.about && (
              <p className="text-red-500 text-sm mt-1">{errors.about.message}</p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <Button type="submit" disabled={isDeploying}>
            {isDeploying ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t('deploy.deploying')}
              </>
            ) : (
              <>
                <Github className="mr-2 h-4 w-4" />
                {t('deploy.button')}
              </>
            )}
          </Button>

          <Suspense fallback={<div>Loading...</div>}>
            <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Eye className="mr-2 h-4 w-4" />
                  {t('preview.button')}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>{t('preview.title')}</DialogTitle>
                </DialogHeader>
                <div className="mt-4">
                  {/* Preview Content */}
                  <div className="space-y-6">
                    {formData.avatar && (
                      <img
                        src={
                          formData.avatar instanceof File
                            ? URL.createObjectURL(formData.avatar)
                            : formData.avatar
                        }
                        alt="Preview avatar"
                        className="w-32 h-32 rounded-full object-cover mx-auto"
                      />
                    )}
                    <h1 className="text-3xl font-bold text-center">
                      {formData.name || t('preview.placeholder.name')}
                    </h1>
                    <p className="text-xl text-gray-600 text-center">
                      {formData.role || t('preview.placeholder.role')}
                    </p>
                    <p className="text-gray-700">
                      {formData.about || t('preview.placeholder.about')}
                    </p>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{t('skills.title')}</h3>
                      <div className="flex flex-wrap gap-2">
                        {formData.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </Suspense>
        </div>
      </form >
    </div >
  );
}
